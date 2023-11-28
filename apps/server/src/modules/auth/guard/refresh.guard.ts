import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { refreshToken } = this.authService.getTokenFromRequest(request);

    if (!refreshToken) throw new UnauthorizedException('No Refresh Token');

    const isValid = await this.authService.verifyToken(refreshToken);
    if (!isValid) throw new UnauthorizedException('TokenExpired');

    return true;
  }
}
