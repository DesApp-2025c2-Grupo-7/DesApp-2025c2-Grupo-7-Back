import type { Prestador } from './interfaces/prestador.interface';
export declare class PrestadoresService {
    private prestadores;
    private calcularHorarioHasta;
    private procesarPrestadorConHorarios;
    findAll(q?: string): Prestador[];
    findOne(id: number): Prestador;
}
