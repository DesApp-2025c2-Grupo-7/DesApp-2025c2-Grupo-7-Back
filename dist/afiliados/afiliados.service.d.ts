import type { Afiliado } from './interfaces/afiliado.interface';
export declare class AfiliadosService {
    private afiliados;
    findAll(q?: string, grupoFamiliar?: string): Afiliado[];
    findOne(id: number): Afiliado | undefined;
    findByGrupoFamiliar(grupoFamiliar: string): Afiliado[];
    findTitularByGrupo(grupoFamiliar: string): Afiliado | undefined;
    findDependientesByTitular(titularId: number): Afiliado[];
}
