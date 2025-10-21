import { EspecialidadesService } from './especialidades.service';
import type { Especialidad } from './entities/especialidades.entity';
export declare class EspecialidadesController {
    private readonly service;
    constructor(service: EspecialidadesService);
    findAll(): Promise<Especialidad[]>;
    findOne(id: string): Promise<Especialidad>;
    create(body: Partial<Especialidad>): Promise<Especialidad>;
    update(id: string, body: Partial<Especialidad>): Promise<Especialidad>;
    remove(id: string): Promise<void>;
}
