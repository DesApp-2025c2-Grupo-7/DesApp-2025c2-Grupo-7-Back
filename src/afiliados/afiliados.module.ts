import { Module } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';

@Module({
    controllers: [AfiliadosController],
    providers: [AfiliadosService],
    exports: [AfiliadosService],
})
export class AfiliadosModule { }
