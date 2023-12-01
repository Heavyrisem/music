import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Model } from '@music/types';
import { Request } from 'express';

import { REFRESH_TOKEN_KEY } from './auth.constant';
import { GoogleStrategy } from './strategy/google.strategy';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly googleStrategy: GoogleStrategy,
    private readonly jwtService: JwtService,
  ) {}

  async getProfileFromCode(
    code: string,
    redirectUri: string,
    provider: Model.Provider,
  ): Promise<Model.BaseUserInfo> {
    let profile: Model.BaseUserInfo;

    switch (provider) {
      case Model.Provider.GOOGLE:
        profile = await this.googleStrategy.getProfile(code, redirectUri);
        break;
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }

    return profile;
  }

  getParameterForProvider(provider: Model.Provider) {
    switch (provider) {
      case Model.Provider.GOOGLE:
        return this.googleStrategy.getParameter();
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  getAuthorizationURL(provider: Model.Provider) {
    switch (provider) {
      case Model.Provider.GOOGLE:
        return this.googleStrategy.getAuthorizationURL();
      default:
        throw new BadRequestException(`OAuth provider not founded: ${provider}`);
    }
  }

  generateToken({ id }: Model.UserJwtPayload) {
    return {
      accessToken: this.jwtService.sign({ id }, { expiresIn: '30s' }),
      refreshToken: this.jwtService.sign({ id }, { expiresIn: '1h' }),
    };
  }

  // TODO: Redis에서 강제로 만료시킬 토큰 목록을 불러와서 체크
  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (err) {
      this.logger.warn(`${err}, ${token}`);
      return false;
    }
  }

  getTokenFromRequest(req: Request) {
    const accessToken = req.headers['authorization']?.split(' ')?.[1];

    return {
      accessToken: accessToken ?? null,
      refreshToken: (req.cookies?.[REFRESH_TOKEN_KEY] as string) ?? null,
    };
  }

  getPayload(token: string): Model.UserJwtPayload {
    const payload = token.split('.').at(1);
    if (!payload) throw new BadRequestException('Invalid Token');
    const res = Buffer.from(payload, 'base64').toString();
    return JSON.parse(res) as Model.UserJwtPayload;
  }

  //   private getPayloadFromProfile(profile: Shared.OAuthProfile): TokenPayload {
  //     return {
  //       id: profile.providerId,
  //       name: profile.name,
  //       provider: profile.provider,
  //       email: profile.email,
  //       iat: 0,
  //       exp: 0,
  //     };
  //   }
}
