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

  async findTopPlayedMusic(maxCount = 20) {
    const topPlayedMusicId = await this.playHistoryRepository
      .createQueryBuilder('playHistory')
      .select('playHistory.music', 'musicId')
      .addSelect('COUNT(*)', 'playCount')
      .groupBy('playHistory.music')
      .orderBy('playCount', 'DESC')
      .limit(maxCount)
      .getRawMany()
      .then((res) => res.map((data) => ({ musicId: Number(data.musicId) })));

    return Promise.all(
      topPlayedMusicId.map(({ musicId }) => this.musicService.findMusicById(musicId)),
    );
  }

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

    const playHistory = await this.playHistoryRepository.find({
      where: { user: { id: existUser.id } },
      relations: { music: true },
      order: { createdAt: 'DESC' },
      take: (getuserPlayHistoryDto.maxCount ?? 20) * 2,
    });

    const uniqueMusics = playHistory
      .reduce((acc, current) => {
        const lastMusic = acc.length > 0 ? acc[acc.length - 1] : null;
        if (!lastMusic || lastMusic.music.id !== current.music.id) {
          acc.push(current);
        }
        return acc;
      }, [] as PlayHistory[])
      .slice(0, getuserPlayHistoryDto.maxCount);

    return uniqueMusics;
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
