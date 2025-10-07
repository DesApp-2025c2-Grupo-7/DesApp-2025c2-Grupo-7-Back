import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import type { Prestador } from './entities/prestador.entity';

@Controller('prestadores')
export class PrestadoresController {
    constructor(private readonly service: PrestadoresService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    // Crear prestador con especialidades
    @Post()
    create(@Body() body: Partial<Prestador> & { especialidadIds?: number[] }) {
        return this.service.create(body, body.especialidadIds || []);
    }

    // Actualizar prestador con especialidades
    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Prestador> & { especialidadIds?: number[] }) {
        return this.service.update(Number(id), body, body.especialidadIds || []);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}
