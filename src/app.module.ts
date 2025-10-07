import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { PrestadoresModule } from './prestadores/prestadores.module'; // opcional si ya lo tenés
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: Number(config.get<number>('DB_PORT') || 5432),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    AfiliadosModule,
    PrestadoresModule, // si querés también
    EspecialidadesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
