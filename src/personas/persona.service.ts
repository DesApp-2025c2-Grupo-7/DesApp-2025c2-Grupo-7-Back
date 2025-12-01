import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { GrupoFamiliar } from './entities/grupoFamiliar.entity';
import { DireccionPersona } from './entities/direccionPersona.entity';
import { SituacionTerapeutica } from './entities/situacionTerapeutica.entity';
import { Between, IsNull } from 'typeorm';




@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRepo: Repository<Persona>,
    @InjectRepository(GrupoFamiliar) private grupoRepo: Repository<GrupoFamiliar>,
    @InjectRepository(DireccionPersona) private direccionRepository: Repository<DireccionPersona>,
    @InjectRepository(SituacionTerapeutica) private situacionRepo: Repository<SituacionTerapeutica>,
    private readonly dataSource: DataSource,
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
    const persona = await this.personaRepo.findOne({
      where: { id }
    });

    if (!persona) throw new NotFoundException(`Persona ${id} no encontrada`);

    // Extraer solo campos modificables
    const {
      grupoFamiliar,
      direccion,
      situacionesTerapeuticas,
      credencial,
      sufijo,
      tipoPersona,
      grupoFamiliarId,
      id: dtoId,
      ...camposModificables
    } = dto as any;


    // Si es AFILIADO y se está modificando el planMedico
    if (persona.tipoPersona === 'AFILIADO' && camposModificables.planMedico) {


      // 1. Actualizar el grupo familiar
      const resultGrupo = await this.grupoRepo.update(
        { credencial: persona.credencial },
        { planMedico: camposModificables.planMedico }
      );


      // 2. Actualizar TODAS las personas con esa credencial
      const resultPersonas = await this.personaRepo
        .createQueryBuilder()
        .update(Persona)
        .set({ planMedico: camposModificables.planMedico })
        .where('credencial = :credencial', { credencial: persona.credencial })
        .execute();
    }

    // Actualizar la persona específica
    await this.personaRepo.update(id, camposModificables);

    const updated = await this.personaRepo.findOne({ where: { id } });
    if (!updated) throw new NotFoundException(`Persona ${id} no encontrada`);
    return updated;
  }

  async remove(id: number): Promise<void> {
    const persona = await this.personaRepo.findOne({ where: { id } });
    if (!persona) throw new NotFoundException(`No se encontró la persona con ID ${id}`);

    if (persona.tipoPersona === 'AFILIADO') {
      // Si es AFILIADO, se da de baja al titular y a todos los integrantes del Grupo Familiar
      const personasRelacionadas = await this.personaRepo.find({
        where: { credencial: persona.credencial },
      });

      const ids = personasRelacionadas.map((p) => p.id);
      if (ids.length > 0) {
        await this.personaRepo.delete(ids);
      }

      await this.grupoRepo.delete({ credencial: persona.credencial });
    } else {
      // Da de baja solo al integrante
      await this.personaRepo.delete(id);
    }
  }


  // AGREGAR INTEGRANTE AL GRUPO FAMILIAR CON SUFIJO AUTOINCREMENTAL

  async addIntegrante(afiliadoId: number, integranteDto: Partial<Persona>): Promise<Persona> {
    const afiliado = await this.findAfiliadoById(afiliadoId);

    // 1. Calcular siguiente sufijo
    const sufijos = afiliado.grupoFamiliar.personas
      .map(p => parseInt(p.sufijo, 10))
      .filter(n => !isNaN(n));

    const nextSufijo = sufijos.length === 0
      ? '02'
      : (Math.max(...sufijos) + 1).toString().padStart(2, '0');

    if (parseInt(nextSufijo, 10) > 99) {
      throw new Error('No se pueden agregar más integrantes a este grupo familiar (límite 99).');
    }

    // 2. Crear integrante
    const integrante = this.personaRepo.create({
      ...integranteDto,
      tipoPersona: 'INTEGRANTE',
      credencial: afiliado.credencial,
      sufijo: nextSufijo,
      grupoFamiliar: afiliado.grupoFamiliar,
      planMedico: afiliado.planMedico,
      fechaAlta: new Date().toISOString().split('T')[0],
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
    // 1. Generar nueva credencial si no viene
    let nextCredencial = dto.credencial;
    if (!nextCredencial) {
      const lastGrupo = await this.grupoRepo
        .createQueryBuilder('g')
        .orderBy('g.credencial', 'DESC')
        .getOne();

      nextCredencial = lastGrupo
        ? (parseInt(lastGrupo.credencial, 10) + 1).toString().padStart(6, '0')
        : '000001';
    }

    // 2. Crear o encontrar grupo familiar
    let grupo = await this.grupoRepo.findOne({ where: { credencial: nextCredencial } });
    if (!grupo) {
      grupo = this.grupoRepo.create({
        credencial: nextCredencial,
        planMedico: dto.planMedico || '',
        fechaAlta: dto.fechaAlta || new Date().toISOString().split('T')[0],
        personas: [],
      });
      await this.grupoRepo.save(grupo);
    }

    // 3. Crear afiliado con sufijo '01'
    const afiliado = this.personaRepo.create({
      ...dto,
      tipoPersona: 'AFILIADO',
      credencial: nextCredencial,
      sufijo: '01',
      grupoFamiliar: grupo,
      fechaAlta: dto.fechaAlta || new Date().toISOString().split('T')[0],
    });

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

  // CRUDs de DIRECCION de PERSONAS (AFILIADOS E INTEGRANTES)

  // ────────────── Agregar dirección a una persona ──────────────
  async addDireccion(personaId: number, dto: Partial<DireccionPersona>) {
    const persona = await this.personaRepo.findOne({
      where: { id: personaId },
      relations: ['direccion'],
    });

    if (!persona) throw new NotFoundException('Persona no encontrada');

    const nuevaDireccion = this.direccionRepository.create({ ...dto, persona });
    await this.direccionRepository.save(nuevaDireccion);

    return this.personaRepo.findOne({
      where: { id: personaId },
      relations: ['direccion'],
    });
  }

  // ────────────── Actualizar dirección ──────────────
  async updateDireccion(personaId: number, direccionId: number, dto: Partial<DireccionPersona>) {
    const direccion = await this.direccionRepository.findOne({
      where: { id: direccionId, personaId },
    });

    if (!direccion) throw new NotFoundException('Dirección no encontrada');
    Object.assign(direccion, dto);
    return this.direccionRepository.save(direccion);
  }

  // ────────────── Eliminar dirección ──────────────
  async removeDireccion(personaId: number, direccionId: number) {
    const direccion = await this.direccionRepository.findOne({
      where: { id: direccionId, personaId },
    });

    if (!direccion) throw new NotFoundException('Dirección no encontrada');
    await this.direccionRepository.remove(direccion);
    return { message: 'Dirección eliminada correctamente' };
  }

  // CRUDs de SITUACION TERAPEUTICA de PERSONA -----------------------------------------------------------------------------------------------------------------
  async addSituacionTerapeutica(
    personaId: number,
    dto: Partial<SituacionTerapeutica>,
  ) {
    const persona = await this.personaRepo.findOne({
      where: { id: personaId },
    });
    if (!persona) throw new NotFoundException('Persona no encontrada');

    const nueva = this.situacionRepo.create({ ...dto, persona });
    return await this.situacionRepo.save(nueva);
  }

  // ──────────────── Actualizar una situación terapéutica ────────────────
  async updateSituacionTerapeutica(
    personaId: number,
    situacionId: number,
    dto: Partial<SituacionTerapeutica>,
  ) {
    const situacion = await this.situacionRepo.findOne({
      where: { id: situacionId, persona: { id: personaId } },
    });
    if (!situacion)
      throw new NotFoundException('Situación terapéutica no encontrada');

    Object.assign(situacion, dto);
    return await this.situacionRepo.save(situacion);
  }

  // ──────────────── Eliminar una situación terapéutica ────────────────
  async removeSituacionTerapeutica(personaId: number, situacionId: number) {
    const situacion = await this.situacionRepo.findOne({
      where: { id: situacionId, persona: { id: personaId } },
    });
    if (!situacion)
      throw new NotFoundException('Situación terapéutica no encontrada');

    await this.situacionRepo.remove(situacion);
    return { message: 'Situación terapéutica eliminada correctamente' };
  }

  // ────────────── Filtrar afiliados por fechaAlta y fechaBaja ──────────────
  async getByFechaAltaYBaja(fechaDesde: string, fechaHasta: string): Promise<Persona[]> {
    return this.personaRepo.find({
      where: [
        // Coincide si fechaAlta está dentro del rango
        { fechaAlta: Between(fechaDesde, fechaHasta) },

        // O si fechaBaja está en rango
        { fechaBaja: Between(fechaDesde, fechaHasta) },

        // O si nunca tuvo fecha de baja y su alta está dentro del periodo
        { fechaAlta: Between(fechaDesde, fechaHasta), fechaBaja: IsNull() },
      ],
      order: { fechaAlta: 'ASC', apellido: 'ASC' },
    });
  }

}
