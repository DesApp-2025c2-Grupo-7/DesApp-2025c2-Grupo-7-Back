import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import type { Especialidad } from './entities/especialidades.entity';

@Controller('especialidades')
export class EspecialidadesController {
    constructor(private readonly service: EspecialidadesService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    @Post()
    create(@Body() body: Partial<Especialidad>) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Especialidad>) {
        return this.service.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}
