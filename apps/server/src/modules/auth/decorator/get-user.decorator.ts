import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Model } from '@music/types';

import { REQUEST_USER } from '../auth.constant';

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request[REQUEST_USER] as Model.UserInfo | undefined;
});
