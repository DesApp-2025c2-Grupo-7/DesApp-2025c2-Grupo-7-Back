import { Persona } from './persona.entity';
export declare class GrupoFamiliar {
    credencial: string;
    planMedico: string;
    estado: string;
    fechaAlta: string;
    fechaBaja: string | null;
    personas: Persona[];
}
