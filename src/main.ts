import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // permite peticiones desde el front en otro puerto
  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}
bootstrap();
