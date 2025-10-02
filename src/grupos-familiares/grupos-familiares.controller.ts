import { Controller, Get, Param } from '@nestjs/common';
import { GruposFamiliaresService } from './grupos-familiares.service';
import type { GrupoFamiliar } from '../afiliados/interfaces/afiliado.interface';

@Controller('grupos-familiares')
export class GruposFamiliaresController {
    constructor(private readonly service: GruposFamiliaresService) {}

    @Get()
    findAll(): GrupoFamiliar[] {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): GrupoFamiliar | undefined {
        return this.service.findOne(id);
    }

    @Get('titular/:titularId')
    findByTitular(@Param('titularId') titularId: string): GrupoFamiliar | undefined {
        return this.service.findByTitular(Number(titularId));
    }
}