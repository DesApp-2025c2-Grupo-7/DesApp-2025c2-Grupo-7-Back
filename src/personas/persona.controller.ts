import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { Persona } from './entities/persona.entity';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

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
}
