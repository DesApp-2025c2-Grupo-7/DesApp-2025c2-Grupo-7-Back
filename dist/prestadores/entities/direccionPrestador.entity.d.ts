import { Prestador } from './prestador.entity';
import { HorarioAtencion } from './horarioAtencion.entity';
export declare class DireccionPrestador {
    id: number;
    calle: string;
    numero: string;
    localidad: string;
    codigoPostal: string;
    esDireccionCentroMedico: boolean;
    centroMedicoId: number;
    prestador: Prestador;
    horariosAtencion: HorarioAtencion[];
}
