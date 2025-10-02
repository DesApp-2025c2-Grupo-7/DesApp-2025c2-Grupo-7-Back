import { Controller, Get, Param, Query } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './interfaces/afiliado.interface';

@Controller('afiliados')
export class AfiliadosController {
    constructor(private readonly service: AfiliadosService) {}

    @Get()
    findAll(
        @Query('q') q?: string,
        @Query('grupoFamiliar') grupoFamiliar?: string
    ): Afiliado[] {
        return this.service.findAll(q, grupoFamiliar);
    }

    @Get('grupo/:grupoId')
    findByGrupoFamiliar(@Param('grupoId') grupoId: string): Afiliado[] {
        return this.service.findByGrupoFamiliar(grupoId);
    }

    @Get('titular/:grupoId')
    findTitularByGrupo(@Param('grupoId') grupoId: string): Afiliado | undefined {
        return this.service.findTitularByGrupo(grupoId);
    }

    @Get('dependientes/:titularId')
    findDependientesByTitular(@Param('titularId') titularId: string): Afiliado[] {
        return this.service.findDependientesByTitular(Number(titularId));
    }

    @Get(':id')
    findOne(@Param('id') id: string): Afiliado | undefined {
        return this.service.findOne(Number(id));
    }
}
