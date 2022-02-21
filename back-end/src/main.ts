import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`👋 Server is listening on port ${PORT} 👋`);
}
bootstrap();
