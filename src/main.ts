import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // solo errores y warnings
  });
  app.enableCors(); // permite peticiones desde el front en otro puerto
  await app.listen(3001);
  console.log('Backend corriendo en http://localhost:3001');
}
bootstrap();
