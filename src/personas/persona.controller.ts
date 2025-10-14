import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './entities/persona.entity';
import { Direccion } from '../prestadores/entities/direccion.entity';
import { SituacionTerapeutica } from './entities/situacionTerapeutica.entity';


@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  // ────────────── Traer todos los afiliados ──────────────
  @Get()
  findAll(): Promise<Persona[]> {
    return this.personaService.findAll();
  }

  // ────────────── Traer un afiliado por ID ──────────────
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Persona> {
    return this.personaService.findOne(id);
  }

  // ────────────── Crear un afiliado ──────────────
  @Post()
  create(@Body() dto: Partial<Persona>): Promise<Persona> {
    return this.personaService.create(dto);
  }

  // ────────────── Actualizar un afiliado o integrante ──────────────
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<Persona>): Promise<Persona> {
    return this.personaService.update(id, dto);
  }

  // ────────────── Eliminar un afiliado o integrante ──────────────
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.personaService.remove(id);
  }

  // ────────────── Agregar un integrante a un afiliado ──────────────
  @Post(':id/integrantes')
  addIntegrante(
    @Param('id') afiliadoId: number,
    @Body() integranteDto: Partial<Persona>,
  ): Promise<Persona> {
    return this.personaService.addIntegrante(afiliadoId, integranteDto);
  }

  // ────────────── Obtener afiliado con su grupo familiar ──────────────
  @Get('grupo/:credencial')
  getAfiliadoConGrupo(
    @Param('credencial') credencial: string,
  ): Promise<Persona & { grupoFamiliar: Persona[] }> {
    return this.personaService.getAfiliadoConGrupo(credencial);
  }

  // ────────────── Agregar una dirección ──────────────
  @Post(':id/direcciones')
  addDireccion(
    @Param('id') id: number,
    @Body() direccionDto: Partial<Direccion>,
  ) {
    return this.personaService.addDireccion(id, direccionDto);
  }

  // ────────────── Actualizar una dirección ──────────────
  @Put(':id/direcciones/:direccionId')
  updateDireccion(
    @Param('id') id: number,
    @Param('direccionId') direccionId: number,
    @Body() direccionDto: Partial<Direccion>,
  ) {
    return this.personaService.updateDireccion(id, direccionId, direccionDto);
  }

  // ────────────── Eliminar una dirección ──────────────
  @Delete(':id/direcciones/:direccionId')
  removeDireccion(
    @Param('id') id: number,
    @Param('direccionId') direccionId: number,
  ) {
    return this.personaService.removeDireccion(id, direccionId);
  }

  // ────────────── Agregar una situación terapéutica ──────────────
  @Post(':id/situaciones-terapeuticas')
  addSituacion(
    @Param('id') id: number,
    @Body() dto: Partial<SituacionTerapeutica>,
  ) {
    return this.personaService.addSituacionTerapeutica(id, dto);
  }

  // ────────────── Actualizar una situación terapéutica ──────────────
  @Put(':id/situaciones-terapeuticas/:situacionId')
  updateSituacion(
    @Param('id') id: number,
    @Param('situacionId') situacionId: number,
    @Body() dto: Partial<SituacionTerapeutica>,
  ) {
    return this.personaService.updateSituacionTerapeutica(id, situacionId, dto);
  }

  // ────────────── Eliminar una situación terapéutica ──────────────
  @Delete(':id/situaciones-terapeuticas/:situacionId')
  removeSituacion(
    @Param('id') id: number,
    @Param('situacionId') situacionId: number,
  ) {
    return this.personaService.removeSituacionTerapeutica(id, situacionId);
  }

}
