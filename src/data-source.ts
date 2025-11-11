// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Especialidad } from './especialidades/entities/especialidades.entity';
import { Prestador } from './prestadores/entities/prestador.entity';
import { DireccionPrestador } from './prestadores/entities/direccionPrestador.entity';
import { HorarioAtencion } from './prestadores/entities/horarioAtencion.entity';
import { Persona } from './personas/entities/persona.entity';
import { SituacionTerapeutica } from './personas/entities/situacionTerapeutica.entity';
import { DireccionPersona } from './personas/entities/direccionPersona.entity';
import { GrupoFamiliar } from './personas/entities/grupoFamiliar.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'desapp_db',
    entities: [
        Especialidad,
        Prestador,
        DireccionPrestador,
        HorarioAtencion,
        Persona,
        SituacionTerapeutica,
        DireccionPersona,
        GrupoFamiliar,
    ],
    synchronize: true, // solo para desarrollo
});
