import { Integrante } from './integrante.entity';
export declare class Afiliado {
    id: number;
    credencial: string;
    sufijo: string;
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: string[];
    email: string[];
    direccion: any[];
    parentesco: string;
    situacionesTerapeuticas: any[];
    planMedico: string;
    fechaAlta: string;
    fechaBaja: string | null;
    grupoFamiliar: Integrante[];
}
