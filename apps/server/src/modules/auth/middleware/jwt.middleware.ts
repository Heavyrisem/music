import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';

import { REQUEST_USER } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  logger = new Logger(JwtMiddleware.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = this.authService.getTokenFromRequest(req);
      if (accessToken || refreshToken) {
        const payload = this.authService.getPayload(accessToken || refreshToken);

        if (typeof payload === 'object' && payload['id']) {
          const user = await this.userService.findUser({ id: payload.id });

          req[REQUEST_USER] = user;
        }
      }
    } catch (err) {
      this.logger.warn(err);
    } finally {
      next();
    }
  }
}
