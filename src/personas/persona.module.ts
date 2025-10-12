import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona } from './entities/persona.entity';
import { GrupoFamiliar } from './entities/grupoFamiliar.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Persona, GrupoFamiliar])],
    providers: [PersonaService],
    controllers: [PersonaController],
})
export class PersonasModule { }
