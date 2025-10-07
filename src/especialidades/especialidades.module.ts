import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { Especialidad } from './entities/especialidades.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Especialidad])],
    controllers: [EspecialidadesController],
    providers: [EspecialidadesService],
    exports: [EspecialidadesService], // opcional, si otros módulos necesitan el servicio
})
export class EspecialidadesModule { }
