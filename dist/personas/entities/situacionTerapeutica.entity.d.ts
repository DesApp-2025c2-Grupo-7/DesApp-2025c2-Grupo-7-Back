import { Persona } from './persona.entity';
export declare class SituacionTerapeutica {
    id: number;
    diagnostico: string;
    fechaInicio: string;
    fechaFin: string;
    persona?: Persona;
    personaId?: number;
}
