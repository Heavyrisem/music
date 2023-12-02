import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from '@music/types';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserById(id: Model.UserInfo['id']): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async saveUser(user: Model.BaseUserInfo): Promise<User> {
    const existUser = await this.userRepository.findOne({ where: { providerId: user.providerId } });
    if (existUser) {
      const mergedUesr = this.userRepository.merge(existUser, user);
      return this.userRepository.save(mergedUesr);
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateUser(user: Pick<Model.UserInfo, 'id'> & Partial<Model.UserInfo>) {
    const existUser = await this.findUserById(user.id);
    if (!existUser) throw new NotFoundError('유저가 없습니다.');

    const mergedUser = this.userRepository.merge(existUser, user);
    return this.userRepository.save(mergedUser);
  }
}
