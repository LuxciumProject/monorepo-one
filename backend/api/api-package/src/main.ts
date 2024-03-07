import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HomeModule } from './home/home.module';

void (async function bootstrap() {
  const app = await NestFactory.create(HomeModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(80);
})();
