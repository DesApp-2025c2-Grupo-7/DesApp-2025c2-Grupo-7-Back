import { Module } from '@nestjs/common';
import { PrestadoresService } from './prestadores.service';
import { PrestadoresController } from './prestadores.controller';

@Module({
    imports: [],
    controllers: [PrestadoresController],
    providers: [PrestadoresService],
})
export class PrestadoresModule { }
