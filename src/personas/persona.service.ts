import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { GrupoFamiliar } from './entities/grupoFamiliar.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRepo: Repository<Persona>,
    @InjectRepository(GrupoFamiliar) private grupoRepo: Repository<GrupoFamiliar>,
  ) {}

  

  // ────────────── Alias: findAll ──────────────
  findAll(): Promise<Persona[]> {
    return this.findAllAfiliados();
  }

  // ────────────── Alias: findOne ──────────────
  findOne(id: number): Promise<Persona> {
    
    return this.findAfiliadoById(id);
  }

  // ────────────── Alias: create ──────────────
  create(dto: Partial<Persona>): Promise<Persona> {
    return this.createAfiliado(dto);
  }

  // ────────────── Alias: update ──────────────
  async update(id: number, dto: Partial<Persona>): Promise<Persona> {
    await this.personaRepo.update(id, dto);
    const updated = await this.personaRepo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`Persona ${id} no encontrada`);
    return updated;
  }

  // ────────────── Alias: remove ──────────────
 async remove(id: number): Promise<void> {
  // Afiliado 
  const afiliado = await this.personaRepo.findOne({ where: { id } });
  if (!afiliado) {
    throw new NotFoundException(`No se encontró el afiliado con ID ${id}`);
  }

  // Todas las personas que comparten la misma credencial
  const personasRelacionadas = await this.personaRepo.find({
    where: { credencial: afiliado.credencial },
  });

  // Eliminamos todas las personas del grupo familiar (incluido el afiliado)
  const ids = personasRelacionadas.map((p) => p.id);
  if (ids.length > 0) {
    await this.personaRepo.delete(ids);
  }

  // 4️⃣ Finalmente, eliminamos el grupo familiar asociado
  await this.grupoRepo.delete({ credencial: afiliado.credencial });
}

  // ────────────── Alias: addIntegrante ──────────────
async addIntegrante(
  afiliadoId: number,
  integranteDto: Partial<Persona>
): Promise<Persona> {
  // Traemos el afiliado con su grupo familiar
  const afiliado = await this.findAfiliadoById(afiliadoId);

  // Creamos el integrante
  const integrante = this.personaRepo.create({
    ...integranteDto,
    tipoPersona: 'INTEGRANTE',
    credencial: afiliado.credencial,         // heredamos credencial
    grupoFamiliar: afiliado.grupoFamiliar,   // usamos la relación directamente
    planMedico: afiliado.planMedico,         // heredamos plan médico
  });

  // Guardamos y retornamos
  return this.personaRepo.save(integrante);
}


  // ────────────── Métodos internos ──────────────

  // Traer todos los afiliados
  private async findAllAfiliados(): Promise<Persona[]> {
    return this.personaRepo.find({ where: { tipoPersona: 'AFILIADO' } });
  }

  // Traer un afiliado por id
  private async findAfiliadoById(id: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({
      where: { id, tipoPersona: 'AFILIADO' },
      relations: ['grupoFamiliar'], // 👈 traemos el grupo familiar
    });

    if (!persona) {
      throw new NotFoundException(`Afiliado ${id} no encontrado`);
    }

    return persona;
  }


  // Crear un afiliado
  private async createAfiliado(dto: Partial<Persona>): Promise<Persona> {
    const afiliado = this.personaRepo.create({
      ...dto,
      tipoPersona: 'AFILIADO',
    });

    // Asociar a grupo familiar existente o crear uno nuevo
    let grupo = await this.grupoRepo.findOne({ where: { credencial: dto.credencial } });
    if (!grupo) {
      grupo = this.grupoRepo.create({
        credencial: dto.credencial,
        planMedico: dto.planMedico || '',
        fechaAlta: dto.fechaAlta || new Date().toISOString().split('T')[0],
        personas: [],
      });
      await this.grupoRepo.save(grupo);
    }

    afiliado.grupoFamiliar = grupo;
    return this.personaRepo.save(afiliado);
  }

  // Obtener afiliado con su grupo familiar
  async getAfiliadoConGrupo(credencial: string): Promise<Persona & { grupoFamiliar: Persona[] }> {
  const personas = await this.personaRepo.find({ where: { credencial } });

  const titular = personas.find(p => p.tipoPersona === 'AFILIADO');
  if (!titular) throw new NotFoundException(`Afiliado con credencial ${credencial} no encontrado`);

  const integrantes = personas.filter(p => p.tipoPersona === 'INTEGRANTE');

  // Retornamos el titular con una propiedad temporal "grupoFamiliar" solo para el front
  return {
    ...titular,
    grupoFamiliar: integrantes,
  } as Persona & { grupoFamiliar: Persona[] };
}
}
