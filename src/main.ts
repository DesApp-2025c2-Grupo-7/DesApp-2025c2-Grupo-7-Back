import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // solo errores y warnings
  });

  app.enableCors(); // permite peticiones desde el front en otro dominio

  const port = process.env.PORT || 3000; // puerto dinámico en Render
  await app.listen(port);

  console.log(`Backend corriendo en el puerto ${port}`);
}
bootstrap();
