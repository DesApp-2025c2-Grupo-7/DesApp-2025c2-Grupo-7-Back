import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { GrupoFamiliar } from './entities/grupoFamiliar.entity';
import { DireccionPersona } from './entities/direccionPersona.entity';
import { SituacionTerapeutica } from './entities/situacionTerapeutica.entity';
export declare class PersonaService {
    private personaRepo;
    private grupoRepo;
    private direccionRepository;
    private situacionRepo;
    constructor(personaRepo: Repository<Persona>, grupoRepo: Repository<GrupoFamiliar>, direccionRepository: Repository<DireccionPersona>, situacionRepo: Repository<SituacionTerapeutica>);
    findAll(): Promise<Persona[]>;
    findOne(id: number): Promise<Persona>;
    create(dto: Partial<Persona>): Promise<Persona>;
    update(id: number, dto: Partial<Persona>): Promise<Persona>;
    remove(id: number): Promise<void>;
    addIntegrante(afiliadoId: number, integranteDto: Partial<Persona>): Promise<Persona>;
    private findAllAfiliados;
    private findAfiliadoById;
    private createAfiliado;
    getAfiliadoConGrupo(credencial: string): Promise<Persona & {
        grupoFamiliar: Persona[];
    }>;
    addDireccion(personaId: number, dto: Partial<DireccionPersona>): Promise<Persona | null>;
    updateDireccion(personaId: number, direccionId: number, dto: Partial<DireccionPersona>): Promise<DireccionPersona>;
    removeDireccion(personaId: number, direccionId: number): Promise<{
        message: string;
    }>;
    addSituacionTerapeutica(personaId: number, dto: Partial<SituacionTerapeutica>): Promise<SituacionTerapeutica>;
    updateSituacionTerapeutica(personaId: number, situacionId: number, dto: Partial<SituacionTerapeutica>): Promise<SituacionTerapeutica>;
    removeSituacionTerapeutica(personaId: number, situacionId: number): Promise<{
        message: string;
    }>;
}
