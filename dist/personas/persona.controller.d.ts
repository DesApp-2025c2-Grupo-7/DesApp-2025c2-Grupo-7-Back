import { PersonaService } from './persona.service';
import { Persona } from './entities/persona.entity';
import { DireccionPersona } from './entities/direccionPersona.entity';
import { SituacionTerapeutica } from './entities/situacionTerapeutica.entity';
export declare class PersonaController {
    private readonly personaService;
    constructor(personaService: PersonaService);
    findAll(): Promise<Persona[]>;
    findOne(id: number): Promise<Persona>;
    create(dto: Partial<Persona>): Promise<Persona>;
    update(id: number, dto: Partial<Persona>): Promise<Persona>;
    remove(id: number): Promise<void>;
    addIntegrante(afiliadoId: number, integranteDto: Partial<Persona>): Promise<Persona>;
    getAfiliadoConGrupo(credencial: string): Promise<Persona & {
        grupoFamiliar: Persona[];
    }>;
    addDireccion(id: number, direccionDto: Partial<DireccionPersona>): Promise<Persona | null>;
    updateDireccion(id: number, direccionId: number, direccionDto: Partial<DireccionPersona>): Promise<DireccionPersona>;
    removeDireccion(id: number, direccionId: number): Promise<{
        message: string;
    }>;
    addSituacion(id: number, dto: Partial<SituacionTerapeutica>): Promise<SituacionTerapeutica>;
    updateSituacion(id: number, situacionId: number, dto: Partial<SituacionTerapeutica>): Promise<SituacionTerapeutica>;
    removeSituacion(id: number, situacionId: number): Promise<{
        message: string;
    }>;
}
