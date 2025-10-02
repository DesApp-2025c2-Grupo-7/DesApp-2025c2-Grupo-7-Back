import { Module } from '@nestjs/common';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { PrestadoresModule } from './prestadores/prestadores.module';
import { GruposFamiliaresModule } from './grupos-familiares/grupos-familiares.module';

@Module({
  imports: [AfiliadosModule, PrestadoresModule, GruposFamiliaresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
