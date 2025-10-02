import type { GrupoFamiliar } from '../afiliados/interfaces/afiliado.interface';
export declare class GruposFamiliaresService {
    private gruposFamiliares;
    findAll(): GrupoFamiliar[];
    findOne(id: string): GrupoFamiliar | undefined;
    findByTitular(titularId: number): GrupoFamiliar | undefined;
}
