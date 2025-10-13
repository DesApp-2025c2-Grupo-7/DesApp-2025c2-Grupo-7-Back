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
  ) { }

  findAll(): Promise<Persona[]> {
    return this.findAllAfiliados();
  }

  findOne(id: number): Promise<Persona> {
    return this.findAfiliadoById(id);
  }

  create(dto: Partial<Persona>): Promise<Persona> {
    return this.createAfiliado(dto);
  }

  async update(id: number, dto: Partial<Persona>): Promise<Persona> {
    await this.personaRepo.update(id, dto);
    const updated = await this.personaRepo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`Persona ${id} no encontrada`);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const persona = await this.personaRepo.findOne({ where: { id } });
    if (!persona) throw new NotFoundException(`No se encontró la persona con ID ${id}`);

    if (persona.tipoPersona === 'AFILIADO') {
      // 👉 Si es titular, eliminamos todo el grupo familiar
      const personasRelacionadas = await this.personaRepo.find({
        where: { credencial: persona.credencial },
      });

      const ids = personasRelacionadas.map((p) => p.id);
      if (ids.length > 0) {
        await this.personaRepo.delete(ids);
      }

      await this.grupoRepo.delete({ credencial: persona.credencial });
    } else {
      // 👉 Si es integrante, solo borramos esa persona
      await this.personaRepo.delete(id);
    }
  }

  async addIntegrante(afiliadoId: number, integranteDto: Partial<Persona>): Promise<Persona> {
    const afiliado = await this.findAfiliadoById(afiliadoId);

    const integrante = this.personaRepo.create({
      ...integranteDto,
      tipoPersona: 'INTEGRANTE',
      credencial: afiliado.credencial,
      grupoFamiliar: afiliado.grupoFamiliar,
      planMedico: afiliado.planMedico,
    });

    return this.personaRepo.save(integrante);
  }

  private async findAllAfiliados(): Promise<Persona[]> {
    return this.personaRepo.find({ where: { tipoPersona: 'AFILIADO' } });
  }

  private async findAfiliadoById(id: number): Promise<Persona> {
    const persona = await this.personaRepo.findOne({
      where: { id, tipoPersona: 'AFILIADO' },
      relations: ['grupoFamiliar'],
    });
    if (!persona) throw new NotFoundException(`Afiliado ${id} no encontrado`);
    return persona;
  }

  private async createAfiliado(dto: Partial<Persona>): Promise<Persona> {
    const afiliado = this.personaRepo.create({
      ...dto,
      tipoPersona: 'AFILIADO',
    });

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

  async getAfiliadoConGrupo(credencial: string): Promise<Persona & { grupoFamiliar: Persona[] }> {
    const personas = await this.personaRepo.find({ where: { credencial } });

    const titular = personas.find((p) => p.tipoPersona === 'AFILIADO');
    if (!titular) throw new NotFoundException(`Afiliado con credencial ${credencial} no encontrado`);

    const integrantes = personas.filter((p) => p.tipoPersona === 'INTEGRANTE');

    return {
      ...titular,
      grupoFamiliar: integrantes,
    } as Persona & { grupoFamiliar: Persona[] };
  }
}
