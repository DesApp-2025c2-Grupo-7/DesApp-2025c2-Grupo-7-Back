import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestador } from './entities/prestador.entity';
import { Especialidad } from '../especialidades/entities/especialidades.entity';
import { PrestadoresService } from './prestadores.service';
import { PrestadoresController } from './prestadores.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Prestador, Especialidad])],
    providers: [PrestadoresService],
    controllers: [PrestadoresController],
})
export class PrestadoresModule { }
