import type { Prestador } from './interfaces/prestador.interface';
export declare class PrestadoresService {
    private prestadores;
    findAll(q?: string): Prestador[];
    findOne(id: number): Prestador;
}
