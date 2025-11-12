import { DireccionPrestador } from './direccionPrestador.entity';
import { Especialidad } from '../../especialidades/entities/especialidades.entity';
export declare class Prestador {
    id: number;
    numeroCUIL: string;
    nombreCompleto: string;
    especialidades: Especialidad[];
    esProfesionalIndependiente: boolean;
    telefono: string[];
    email: string[];
    direccion: DireccionPrestador[];
    profesionales: Prestador[];
    centrosMedicos: Prestador[];
}
