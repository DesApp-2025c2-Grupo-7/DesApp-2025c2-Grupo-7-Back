import { Module } from '@nestjs/common';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { PrestadoresModule } from './prestadores/prestadores.module';

@Module({
  imports: [AfiliadosModule, PrestadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
