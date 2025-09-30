import { Controller, Get, Param, Query } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './interfaces/afiliado.interface';

@Controller('afiliados')
export class AfiliadosController {
    constructor(private readonly service: AfiliadosService) { }

    @Get()
    findAll(@Query('q') q?: string): Afiliado[] {
        return this.service.findAll(q);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Afiliado | undefined {
        return this.service.findOne(Number(id));
    }
}
