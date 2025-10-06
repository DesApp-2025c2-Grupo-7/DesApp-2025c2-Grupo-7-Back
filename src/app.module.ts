import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliadosModule } from './afiliados/afiliados.module';
import { PrestadoresModule } from './prestadores/prestadores.module'; // opcional si ya lo tenés

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // SOLO para desarrollo
      }),
    }),
    AfiliadosModule,
    PrestadoresModule, // si querés también
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
