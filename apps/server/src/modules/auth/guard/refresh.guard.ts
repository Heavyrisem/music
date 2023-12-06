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
export class RefreshGuard implements CanActivate {
  logger = new Logger(RefreshGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { [REQUEST_USER]?: Model.UserInfo } = context
      .switchToHttp()
      .getRequest();
    const { refreshToken } = this.authService.getTokenFromRequest(request);

    if (!refreshToken) throw new UnauthorizedException('No Refresh Token');

    const isValid = await this.authService.verifyToken(refreshToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    this.logger.debug(request[REQUEST_USER]);
    if (!request[REQUEST_USER]) throw new UnauthorizedException('Not Logged In');

    return true;
  }
}
