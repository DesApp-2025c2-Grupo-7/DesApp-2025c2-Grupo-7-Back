import { Repository } from 'typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { Integrante } from './entities/integrante.entity';
export declare class AfiliadosService {
    private afiliadoRepo;
    private integranteRepo;
    constructor(afiliadoRepo: Repository<Afiliado>, integranteRepo: Repository<Integrante>);
    findAll(): Promise<Afiliado[]>;
    findOne(id: number): Promise<Afiliado>;
    create(dto: Partial<Afiliado>): Promise<Afiliado>;
    update(id: number, dto: Partial<Afiliado>): Promise<Afiliado>;
    remove(id: number): Promise<void>;
    addIntegrante(afiliadoId: number, integranteDto: Partial<Integrante>): Promise<Integrante>;
}
