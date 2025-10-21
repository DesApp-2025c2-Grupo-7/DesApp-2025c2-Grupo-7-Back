import { Repository } from 'typeorm';
import { Prestador } from '../prestadores/entities/prestador.entity';
import { DireccionPrestador } from './entities/direccionPrestador.entity';
import { Especialidad } from '../especialidades/entities/especialidades.entity';
import { HorarioAtencion } from './entities/horarioAtencion.entity';
export declare class PrestadoresService {
    private prestadorRepo;
    private especialidadRepo;
    private direccionRepo;
    private horarioRepo;
    constructor(prestadorRepo: Repository<Prestador>, especialidadRepo: Repository<Especialidad>, direccionRepo: Repository<DireccionPrestador>, horarioRepo: Repository<HorarioAtencion>);
    findAll(): Promise<Prestador[]>;
    findOne(id: number): Promise<Prestador>;
    create(dto: Partial<Prestador>, especialidadIds: number[]): Promise<Prestador>;
    update(id: number, dto: Partial<Prestador>, especialidadIds: number[]): Promise<Prestador>;
    remove(id: number): Promise<void>;
    getDirecciones(prestadorId: number): Promise<DireccionPrestador[]>;
    addDireccion(prestadorId: number, dto: Partial<DireccionPrestador>): Promise<DireccionPrestador>;
    updateDireccion(prestadorId: number, direccionId: number, dto: Partial<DireccionPrestador>): Promise<DireccionPrestador>;
    deleteDireccion(prestadorId: number, direccionId: number): Promise<void>;
    getHorarios(direccionId: number): Promise<HorarioAtencion[]>;
    addHorario(direccionId: number, dto: Partial<HorarioAtencion>): Promise<HorarioAtencion>;
    updateHorario(direccionId: number, horarioId: number, dto: Partial<HorarioAtencion>): Promise<HorarioAtencion>;
    deleteHorario(direccionId: number, horarioId: number): Promise<void>;
}
