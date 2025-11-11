import { DireccionPrestador } from './direccionPrestador.entity';
import { Especialidad } from '../../especialidades/entities/especialidades.entity';
export declare class HorarioAtencion {
    id: number;
    dia: string;
    desde: string;
    hasta: string;
    duracionTurno: string;
    direccion: DireccionPrestador;
    especialidad: Especialidad;
}
