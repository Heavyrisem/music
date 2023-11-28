import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { Model } from '@music/types';
import { Request } from 'express';

import { REQUEST_USER } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  logger = new Logger(LoggedInGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { [REQUEST_USER]?: Model.UserInfo } = context
      .switchToHttp()
      .getRequest();
    const { accessToken } = this.authService.getTokenFromRequest(request);

    if (!accessToken) throw new UnauthorizedException('No Auth Token');

    const isValid = await this.authService.verifyToken(accessToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    this.logger.debug(request[REQUEST_USER]);

    if (request[REQUEST_USER] === undefined) throw new UnauthorizedException('Not Logged In');
    return true;
  }
}
