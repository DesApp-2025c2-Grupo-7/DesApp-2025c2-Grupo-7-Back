import { PrestadoresService } from './prestadores.service';
import { DireccionPrestador } from './entities/direccionPrestador.entity';
import type { Prestador } from './entities/prestador.entity';
import { HorarioAtencion } from './entities/horarioAtencion.entity';
export declare class PrestadoresController {
    private readonly service;
    constructor(service: PrestadoresService);
    getDirecciones(prestadorId: number): Promise<DireccionPrestador[]>;
    addDireccion(prestadorId: number, dto: DireccionPrestador): Promise<DireccionPrestador>;
    updateDireccion(prestadorId: number, direccionId: number, dto: Partial<DireccionPrestador>): Promise<DireccionPrestador>;
    deleteDireccion(prestadorId: number, direccionId: number): Promise<void>;
    findAll(): Promise<Prestador[]>;
    findOne(id: string): Promise<Prestador>;
    create(body: Partial<Prestador>): Promise<Prestador>;
    update(id: string, body: Partial<Prestador> & {
        especialidadIds?: number[];
    }): Promise<Prestador>;
    remove(id: string): Promise<void>;
    getHorarios(direccionId: number): Promise<HorarioAtencion[]>;
    addHorario(direccionId: number, dto: Partial<HorarioAtencion> & {
        especialidadId?: number;
    }): Promise<HorarioAtencion>;
    updateHorario(direccionId: number, horarioId: number, dto: Partial<HorarioAtencion> & {
        especialidadId?: number;
    }): Promise<HorarioAtencion>;
    deleteHorario(direccionId: number, horarioId: number): Promise<void>;
    getProfesionalesIndependientes(centroMedicoId: number): Promise<Prestador[]>;
    agregarProfesionalIndependiente(centroMedicoId: number, profesionalId: number): Promise<Prestador>;
    eliminarProfesionalIndependiente(centroMedicoId: number, profesionalId: number): Promise<void>;
}
