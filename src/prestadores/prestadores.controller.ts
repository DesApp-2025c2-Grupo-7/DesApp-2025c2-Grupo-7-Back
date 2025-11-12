import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import { DireccionPrestador } from './entities/direccionPrestador.entity';
import type { Prestador } from './entities/prestador.entity';
import { HorarioAtencion } from './entities/horarioAtencion.entity';

@Controller('prestadores')
export class PrestadoresController {
    constructor(private readonly service: PrestadoresService) { }

    // ────────────── Rutas CRUD direcciones ──────────────
    @Get(':id/direcciones')
    getDirecciones(@Param('id') prestadorId: number) {
        return this.service.getDirecciones(Number(prestadorId));
    }

    @Post(':id/direcciones')
    addDireccion(@Param('id') prestadorId: number, @Body() dto: DireccionPrestador) {
        return this.service.addDireccion(prestadorId, dto);
    }

    @Put(':id/direcciones/:direccionId')
    updateDireccion(
        @Param('id') prestadorId: number,
        @Param('direccionId') direccionId: number,
        @Body() dto: Partial<DireccionPrestador>,
    ) {
        return this.service.updateDireccion(prestadorId, direccionId, dto);
    }

    @Delete(':id/direcciones/:direccionId')
    deleteDireccion(@Param('id') prestadorId: number, @Param('direccionId') direccionId: number) {
        return this.service.deleteDireccion(Number(prestadorId), Number(direccionId));
    }

    // ────────────── Rutas generales de prestadores ──────────────
    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    @Post()
    create(@Body() body: Partial<Prestador>) {
        const especialidadIds = Array.isArray((body as any).especialidadIds)
            ? (body as any).especialidadIds
            : [];
        return this.service.create(body, especialidadIds);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Prestador> & { especialidadIds?: number[] }) {
        return this.service.update(Number(id), body, body.especialidadIds || []);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }

    //----------------------------- HORARIOS ATENCION--------------------------------------------------
    // ────────────── CRUD de horarios ──────────────

    @Get(':id/direcciones/:direccionId/horarios')
    getHorarios(@Param('direccionId') direccionId: number) {
        return this.service.getHorarios(Number(direccionId));
    }

    @Post(':id/direcciones/:direccionId/horarios')
    addHorario(
        @Param('direccionId') direccionId: number,
        @Body() dto: Partial<HorarioAtencion> & { especialidadId?: number },
    ) {
        return this.service.addHorario(Number(direccionId), dto);
    }

    @Put(':id/direcciones/:direccionId/horarios/:horarioId')
    updateHorario(
        @Param('direccionId') direccionId: number,
        @Param('horarioId') horarioId: number,
        @Body() dto: Partial<HorarioAtencion> & { especialidadId?: number },
    ) {
        return this.service.updateHorario(Number(direccionId), Number(horarioId), dto);
    }

    @Delete(':id/direcciones/:direccionId/horarios/:horarioId')
    deleteHorario(@Param('direccionId') direccionId: number, @Param('horarioId') horarioId: number) {
        return this.service.deleteHorario(Number(direccionId), Number(horarioId));
    }

    // ────────────── Profesionales de Centro Médico ──────────────

    @Get(':id/profesionales')
    getProfesionalesIndependientes(@Param('id') centroMedicoId: number) {
        return this.service.getProfesionalesIndependientes(Number(centroMedicoId));
    }

    @Post(':id/profesionales/:profesionalId')
    agregarProfesionalIndependiente(
        @Param('id') centroMedicoId: number,
        @Param('profesionalId') profesionalId: number,
    ) {
        return this.service.agregarProfesionalIndependiente(
            Number(centroMedicoId),
            Number(profesionalId),
        );
    }

    @Delete(':id/profesionales/:profesionalId')
    eliminarProfesionalIndependiente(
        @Param('id') centroMedicoId: number,
        @Param('profesionalId') profesionalId: number,
    ) {
        return this.service.eliminarProfesionalIndependiente(
            Number(centroMedicoId),
            Number(profesionalId),
        );
    }
}
