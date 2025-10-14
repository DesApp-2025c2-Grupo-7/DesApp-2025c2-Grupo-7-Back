import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import { Direccion } from '../prestadores/entities/direccion.entity';
import type { Prestador } from './entities/prestador.entity';

@Controller('prestadores')
export class PrestadoresController {
    constructor(private readonly service: PrestadoresService) {}

    // ────────────── Rutas CRUD direcciones ──────────────
    @Get(':id/direcciones')
    getDirecciones(@Param('id') prestadorId: number) {
        return this.service.getDirecciones(Number(prestadorId));
    }

    @Post(':id/direcciones')
    addDireccion(@Param('id') prestadorId: number, @Body() dto: Direccion) {
        return this.service.addDireccion(prestadorId, dto);
    }

    @Put(':id/direcciones/:direccionId')
    updateDireccion(
        @Param('id') prestadorId: number,
        @Param('direccionId') direccionId: number,
        @Body() dto: Partial<Direccion>,
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
}
