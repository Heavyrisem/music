import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from '@music/types';
import { Repository } from 'typeorm';

import { MusicService } from '../music/music.service';
import { UserService } from '../user/user.service';
import { GetUserPlayHistoryQuery } from './dto/getUserPlayHistory.dto';
import { PlayHistory } from './entity/playHistory.entity';

@Injectable()
export class PlayHistoryService {
  constructor(
    @InjectRepository(PlayHistory) private playHistoryRepository: Repository<PlayHistory>,
    private readonly userService: UserService,
    private readonly musicService: MusicService,
  ) {}

  async findPlayHistoryById(id: Model.PlayHistoryInfo['id']) {
    return this.playHistoryRepository.findOne({
      where: { id },
      relations: { user: true, music: true },
    });
  }

  async findRecentMusicsByUserId(
    userId: Model.UserInfo['id'],
    getuserPlayHistoryDto: GetUserPlayHistoryQuery,
  ) {
    const existUser = await this.userService.findUserById(userId);
    if (!existUser) throw new NotFoundException('User not found');

    return this.playHistoryRepository.find({
      where: { user: { id: existUser.id } },
      relations: { music: true },
      order: { createdAt: 'DESC' },
      take: getuserPlayHistoryDto.maxCount ?? 20,
    });
  }

  async savePlayHistory(musicId: Model.MusicInfo['id'], userId: Model.UserInfo['id']) {
    const existUser = await this.userService.findUserById(userId);
    if (!existUser) throw new NotFoundException('User not found');

    const existMusicMeta = await this.musicService.findMusicById(musicId);
    if (!existMusicMeta) throw new NotFoundException('Music not found');

    return this.playHistoryRepository.save({
      music: existMusicMeta,
      user: existUser,
    });
  }
}
