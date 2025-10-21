export interface HorarioAtencion {
    dia: string;
    desde: string;
    hasta: string;
    duracionTurno: string;
}
export interface Direccion {
    calle: string;
    numero: string;
    localidad: string;
    codigoPostal: string;
    horariosAtencion: HorarioAtencion[];
}
export interface Prestador {
    id: number;
    numeroCUIL: string;
    nombreCompleto: string;
    especialidades: string[];
    esProfesionalIndependiente: boolean;
    telefono: string[];
    email: string[];
    direccion: Direccion[];
}
