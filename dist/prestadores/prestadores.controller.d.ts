import type { Prestador } from './interfaces/prestador.interface';
import { PrestadoresService } from './prestadores.service';
export declare class PrestadoresController {
    private readonly service;
    constructor(service: PrestadoresService);
    findAll(q?: string): Prestador[];
    findOne(id: string): Prestador | undefined;
}
