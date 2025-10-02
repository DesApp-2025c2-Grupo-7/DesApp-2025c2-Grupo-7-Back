import { GruposFamiliaresService } from './grupos-familiares.service';
import type { GrupoFamiliar } from '../afiliados/interfaces/afiliado.interface';
export declare class GruposFamiliaresController {
    private readonly service;
    constructor(service: GruposFamiliaresService);
    findAll(): GrupoFamiliar[];
    findOne(id: string): GrupoFamiliar | undefined;
    findByTitular(titularId: string): GrupoFamiliar | undefined;
}
