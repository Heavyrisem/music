import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as ytMusic from '@heavyrisem/ytmusic';
import { Model } from '@music/types';
import { Repository } from 'typeorm';
import ytdl from 'ytdl-core';

import { ObjectStorageService } from '../object-storage/object-storage.service';
import { GetSearchMusicDto } from './dto/GetSearchMusic.dto';
import { MusicMeta } from './entity/musicMeta.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(MusicMeta) private readonly musicMetaRepository: Repository<MusicMeta>,
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async searchMusic(getSearchMusicDto: GetSearchMusicDto): Promise<Model.MusicInfo[]> {
    const res = await ytMusic.searchMusics(getSearchMusicDto.query);

    return Promise.all(
      res
        .map((music) => {
          if (music.youtubeId === undefined)
            throw new InternalServerErrorException(`youtubeId 값이 비었습니다. ${music.youtubeId}`);
          if (music.title === undefined)
            throw new InternalServerErrorException(`title 값이 비었습니다. ${music.title}`);
          if (music.thumbnailUrl === undefined)
            throw new InternalServerErrorException(
              `thumbnailUrl 값이 비었습니다. ${music.thumbnailUrl}`,
            );
          if (music.artists === undefined)
            throw new InternalServerErrorException(`artists 값이 비었습니다. ${music.artists}`);
          if (music.album === undefined)
            throw new InternalServerErrorException(`album 값이 비었습니다. ${music.album}`);
          if (music.isExplicit === undefined)
            throw new InternalServerErrorException(
              `isExplicit 값이 비었습니다. ${music.isExplicit}`,
            );
          if (music.duration === undefined)
            throw new InternalServerErrorException(`duration 값이 비었습니다. ${music.duration}`);

          const result: Model.MusicInfoWithoutId = {
            youtubeId: music.youtubeId,
            title: music.title,
            thumbnailUrl: music.thumbnailUrl,
            artist: music.artists.map((artist) => artist.name),
            album: music.album,
            isExplicit: music.isExplicit,
            duration: music.duration.totalSeconds,
          };
          return result;
        })
        .map(this.saveMusicMeta.bind(this)),
    );
  }

  async saveMusicMeta(musicInfo: Model.MusicInfoWithoutId) {
    const existMeta = await this.musicMetaRepository.findOneBy({ youtubeId: musicInfo.youtubeId });
    if (existMeta) {
      existMeta.update(musicInfo);
      return await this.musicMetaRepository.save(existMeta);
    } else return this.musicMetaRepository.save(musicInfo);
  }

  async findMusicById(id: Model.MusicInfo['id']) {
    return this.musicMetaRepository.findOneBy({ id });
  }

  async getMusicObjectMeta(id: Model.MusicInfo['id']) {
    const existMeta = await this.findMusicById(id);
    if (!existMeta) throw new NotFoundException('음악을 찾을 수 없습니다.');

    const existObjectMeta = await this.objectStorageService.findObjectMetaByName(
      existMeta.youtubeId,
    );
    if (existObjectMeta) return existObjectMeta;

    const data = await this.getMusicData(existMeta.youtubeId);
    const savedObjectMeta = await this.objectStorageService.save(
      data.stream,
      existMeta.youtubeId,
      'mp3',
      false,
    );
    return savedObjectMeta;
  }

  private async getMusicData(youtubeId: Model.MusicInfo['youtubeId']) {
    const videoInfo = await ytdl.getInfo(youtubeId);
    const format = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioonly' });

    const size = format.contentLength;
    const stream = ytdl(youtubeId, { format });
    return { stream, size };
  }
}
