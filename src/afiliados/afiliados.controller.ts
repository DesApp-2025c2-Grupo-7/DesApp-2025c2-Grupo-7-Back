import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './entities/afiliado.entity';

@Controller('afiliados')
export class AfiliadosController {
    constructor(private readonly service: AfiliadosService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    @Post()
    create(@Body() body: Partial<Afiliado>) {
        return this.service.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Afiliado>) {
        return this.service.update(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }

    @Post(':id/integrantes')
    addIntegrante(@Param('id') id: string, @Body() body: any) {
        return this.service.addIntegrante(Number(id), body);
    }
}
