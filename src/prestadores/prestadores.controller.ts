import { Controller, Get, Param, Query } from '@nestjs/common';
import type { Prestador } from './interfaces/prestador.interface';
import { PrestadoresService } from './prestadores.service';

@Controller('prestadores')
export class PrestadoresController {
    constructor(private readonly service: PrestadoresService) { }

    @Get()
    findAll(@Query('q') q?: string): Prestador[] {
        return this.service.findAll(q);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Prestador | undefined {
        return this.service.findOne(Number(id));
    }
}
