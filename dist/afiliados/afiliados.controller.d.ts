import { AfiliadosService } from './afiliados.service';
import type { Afiliado } from './entities/afiliado.entity';
export declare class AfiliadosController {
    private readonly service;
    constructor(service: AfiliadosService);
    findAll(): Promise<Afiliado[]>;
    findOne(id: string): Promise<Afiliado>;
    create(body: Partial<Afiliado>): Promise<Afiliado>;
    update(id: string, body: Partial<Afiliado>): Promise<Afiliado>;
    remove(id: string): Promise<void>;
    addIntegrante(id: string, body: any): Promise<import("./entities/integrante.entity").Integrante>;
}
