import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './interfaces/afiliado.interface';
export declare class AfiliadosController {
    private readonly service;
    constructor(service: AfiliadosService);
    findAll(q?: string): Afiliado[];
    findOne(id: string): Afiliado | undefined;
}
