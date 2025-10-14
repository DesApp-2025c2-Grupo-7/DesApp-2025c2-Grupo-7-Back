import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona } from './entities/persona.entity';
import { GrupoFamiliar } from './entities/grupoFamiliar.entity';
import { DireccionPersona } from './entities/direccionPersona.entity'; 
import { SituacionTerapeutica } from './entities/situacionTerapeutica.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Persona, GrupoFamiliar, DireccionPersona, SituacionTerapeutica])], // 👈 agregado Direccion
    providers: [PersonaService],
    controllers: [PersonaController],
})
export class PersonasModule { }
