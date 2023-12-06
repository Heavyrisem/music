import { IBaseResponse } from '@music/types';

export class BaseResponse<T> implements IBaseResponse<T> {
  constructor(
    readonly data: T,
    readonly status: number,
  ) {}

  static of<T>(data: T, status = 1) {
    return new BaseResponse(data, status);
  }
}
