import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpLoggerInterceptor } from './libs/logging/http-logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  app.use(cookieParser());

  const config = app.get(ConfigService);
  await app.listen(config.getOrThrow('PORT'));
}
bootstrap();
