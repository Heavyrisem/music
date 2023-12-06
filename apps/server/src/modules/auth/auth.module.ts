import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigurationModule } from 'src/libs/config/config.module';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
  ],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
