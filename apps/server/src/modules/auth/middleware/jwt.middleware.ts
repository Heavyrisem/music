import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { UserJwtPayload } from '@music/types/src/model';
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
        let payload: UserJwtPayload;

        if (this.authService.verifyToken(accessToken)) {
          payload = this.authService.getPayload(accessToken);
        } else if (this.authService.verifyToken(refreshToken)) {
          payload = this.authService.getPayload(refreshToken);
        }

        if (typeof payload === 'object' && payload['id']) {
          const user = await this.userService.findUserById(payload.id);

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
