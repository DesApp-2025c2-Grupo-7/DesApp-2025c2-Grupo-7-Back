import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './interfaces/afiliado.interface';
export declare class AfiliadosController {
    private readonly service;
    constructor(service: AfiliadosService);
    findAll(q?: string, grupoFamiliar?: string): Afiliado[];
    findByGrupoFamiliar(grupoId: string): Afiliado[];
    findTitularByGrupo(grupoId: string): Afiliado | undefined;
    findDependientesByTitular(titularId: string): Afiliado[];
    findOne(id: string): Afiliado | undefined;
}
