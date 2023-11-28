import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from '@music/types';
import { Repository } from 'typeorm';

import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUser(condition: Partial<Model.UserInfo>): Promise<User> {
    return this.userRepository.findOne({ where: condition });
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
}
