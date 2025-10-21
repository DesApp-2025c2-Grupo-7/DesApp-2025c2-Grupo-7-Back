import { GrupoFamiliar } from './grupoFamiliar.entity';
import { DireccionPersona } from './direccionPersona.entity';
import { SituacionTerapeutica } from './situacionTerapeutica.entity';
export declare class Persona {
    id: number;
    credencial: string;
    sufijo: string;
    tipoPersona: 'AFILIADO' | 'INTEGRANTE';
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: string[];
    email: string[];
    parentesco?: string;
    direccion: DireccionPersona[];
    situacionesTerapeuticas?: SituacionTerapeutica[];
    grupoFamiliar: GrupoFamiliar;
    grupoFamiliarId: string;
    planMedico: string;
    fechaAlta: string;
    fechaBaja: string | null;
}
