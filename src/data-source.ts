// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Especialidad } from './especialidades/entities/especialidades.entity';
import { Prestador } from './prestadores/entities/prestador.entity';
import { Direccion } from './prestadores/entities/direccion.entity';
import { HorarioAtencion } from './prestadores/entities/horarioAtencion.entity';
import { Persona } from './personas/entities/persona.entity';
import { SituacionTerapeutica } from './personas/entities/situacionTerapeutica.entity';    
import { Direccion as DireccionPersona } from './personas/entities/direccionPersona.entity';
import { GrupoFamiliar } from './personas/entities/grupoFamiliar.entity';  
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'devuser',
    password: process.env.DB_PASSWORD || 'devpass',
    database: process.env.DB_DATABASE || 'desapp',
    entities: [Especialidad, 
        Prestador, 
        Direccion, 
        HorarioAtencion, 
        Persona, 
        SituacionTerapeutica, 
        DireccionPersona, 
        GrupoFamiliar],
    synchronize: true, // SOLO para desarrollo
});
