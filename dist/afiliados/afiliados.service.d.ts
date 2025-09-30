import type { Afiliado } from './interfaces/afiliado.interface';
export declare class AfiliadosService {
    private afiliados;
    findAll(q?: string): Afiliado[];
    findOne(id: number): Afiliado | undefined;
}
