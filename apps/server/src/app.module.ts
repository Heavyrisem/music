import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './libs/config/config.module';
import { HttpLoggerMiddleware } from './libs/logging/http-logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { JwtMiddleware } from './modules/auth/middleware/jwt.middleware';
import { MusicModule } from './modules/music/music.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigurationModule, UserModule, AuthModule, MusicModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
