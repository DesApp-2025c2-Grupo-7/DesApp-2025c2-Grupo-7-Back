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

    @Post()
    create(@Body() body: Partial<Prestador>) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Prestador>) {
        return this.service.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}