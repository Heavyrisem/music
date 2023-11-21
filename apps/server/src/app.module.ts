import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './libs/config/config.module';
import { HttpLoggerMiddleware } from './libs/logging/http-logger.middleware';
import { MusicModule } from './modules/music/music.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigurationModule, MusicModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
