import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afiliado } from './entities/afiliado.entity';
import { Integrante } from './entities/integrante.entity';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Afiliado, Integrante])],
    providers: [AfiliadosService],
    controllers: [AfiliadosController],
})
export class AfiliadosModule { }
