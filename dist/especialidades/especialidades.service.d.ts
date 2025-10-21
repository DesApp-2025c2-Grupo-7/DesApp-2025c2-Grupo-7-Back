import { Repository } from 'typeorm';
import { Especialidad } from './entities/especialidades.entity';
export declare class EspecialidadesService {
    private repo;
    constructor(repo: Repository<Especialidad>);
    findAll(): Promise<Especialidad[]>;
    findOne(id: number): Promise<Especialidad>;
    create(dto: Partial<Especialidad>): Promise<Especialidad>;
    update(id: number, dto: Partial<Especialidad>): Promise<Especialidad>;
    remove(id: number): Promise<void>;
}
