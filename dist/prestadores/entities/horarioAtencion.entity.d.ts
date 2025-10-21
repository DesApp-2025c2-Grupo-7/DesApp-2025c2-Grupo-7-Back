import { DireccionPrestador } from './direccionPrestador.entity';
export declare class HorarioAtencion {
    id: number;
    dia: string;
    desde: string;
    hasta: string;
    duracionTurno: string;
    direccion: DireccionPrestador;
}
