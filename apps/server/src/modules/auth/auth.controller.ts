import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Model } from '@music/types';
import { Response } from 'express';

import { UserService } from '../user/user.service';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './auth.constant';
import { OAuthState } from './auth.interface';
import { AuthService } from './auth.service';
import { GetUser } from './decorator/get-user.decorator';
import { LoggedInGuard } from './guard/logged-in.guard';
import { RefreshGuard } from './guard/refresh.guard';

@Controller('/api/auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/oauth/:provider')
  githubAuthRedirect(
    @Res() res: Response,
    @Query('redirect') redirect: string,
    @Param('provider') providerStr: string,
  ) {
    if (!redirect || !providerStr) throw new BadRequestException('some param is null');
    const provider = this.stringToProvider(providerStr);

    const callback = `${this.configService.getOrThrow(
      'AUTH_HOST',
    )}/api/auth/callback/${providerStr}`;
    const params = this.createQueryParameter({
      state: {
        redirect,
        callback,
        provider,
      },
      redirect_uri: callback,
      ...this.authService.getParameterForProvider(provider),
    });

    return res.redirect(`${this.authService.getAuthorizationURL(provider)}?${params}`);
    // http://localhost:3001/auth/github?redirect=http://localhost:3001&callback=http://localhost:3001/auth/github/token
  }

  @Get('/callback/:provider')
  async oauthCallback(
    @Res() res: Response,
    @Query('state') state: any,
    @Query('code') code?: string,
  ) {
    if (!code) throw new BadRequestException('Code is empty');
    if (!state) throw new BadRequestException('State is empty');

    const { redirect, callback, provider } = JSON.parse(state ?? '{}') as OAuthState;
    const profile = await this.authService.getProfileFromCode(code, callback, provider);

    const user = await this.userService.saveUser(profile);

    const { accessToken, refreshToken } = await this.authService.generateToken({ id: user.id });

    this.setCookie(res, ACCESS_TOKEN_KEY, accessToken);
    this.setCookie(res, REFRESH_TOKEN_KEY, refreshToken, true);

    return res.redirect(`${redirect}`);
    // localhost:3000/auth?redirect=http://localhost:3000/auth/test&callback=http://localhost:3000/auth/callback/google&provider=google
  }

  @UseGuards(RefreshGuard)
  @Get('/refresh')
  async refresh(@Res() res: Response, @GetUser() user: Model.UserInfo) {
    this.logger.debug(`Refresh Token For User: ${user?.name}`);
    const { accessToken, refreshToken } = await this.authService.generateToken(user);

    this.setCookie(res, ACCESS_TOKEN_KEY, accessToken);
    this.setCookie(res, REFRESH_TOKEN_KEY, refreshToken, true);

    return res.send();
  }

  @UseGuards(LoggedInGuard)
  @Get('/me')
  async getAuthedUser(@GetUser() user: Model.UserInfo) {
    return user;
  }

  private stringToProvider(providerString: string): Model.Provider {
    switch (providerString) {
      case Model.Provider.GOOGLE:
        return Model.Provider.GOOGLE;
      default:
        throw new InternalServerErrorException(`invalid provider: ${providerString}`);
    }
  }

  private createQueryParameter(params: Record<any, any>) {
    const result = Object.entries(params).map(([key, value]) => {
      if (typeof value === 'string') return `${key}=${encodeURIComponent(value)}`;
      if (Array.isArray(value)) return `${key}=${encodeURIComponent(value.join(' '))}`;
      if (typeof value === 'object') return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
      throw new Error(`Unsupported Parameter Type: ${typeof value}, ${key}: ${value}`);
    });

    return result.join('&');
  }

  private setCookie(res: Response, key: string, value: string, httpOnly = false) {
    res.cookie(key, value, {
      domain: this.configService.getOrThrow('COOKIE_DOMAIN'),
      path: '/',
      httpOnly,
    });
  }
}
