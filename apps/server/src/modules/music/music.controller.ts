import { Controller, Get, Logger, Param, Query, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';
import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { PlayHistoryService } from '../play-history/play-history.service';
import { GetMusicDataParamDto } from './dto/getMusicData.dto';
import { GetSearchMusicDto } from './dto/getSearchMusic.dto';
import { GetTopPlayedMusicQueryDto } from './dto/getTopPlayedMusic.dto';
import { MusicService } from './music.service';

@Controller('/api/music')
export class MusicController {
  logger = new Logger(MusicController.name);

  constructor(
    private readonly musicService: MusicService,
    private readonly objectStorageService: ObjectStorageService,
    private readonly playHistoryService: PlayHistoryService,
  ) {}

  @Get('/search')
  async searchMusic(@Query() getSearchMusicDto: GetSearchMusicDto) {
    const data = await this.musicService.searchMusic(getSearchMusicDto);
    return BaseResponse.of(data);
  }

  @Get('/top')
  async getTopPlayedMusic(@Query() getTopPlayedMusicQueryDto: GetTopPlayedMusicQueryDto) {
    const data = await this.playHistoryService.findTopPlayedMusic(
      getTopPlayedMusicQueryDto.maxCount,
    );

    return BaseResponse.of(data);
  }

  @Get('/:id')
  @UseGuards(LoggedInGuard)
  async getMusicData(
    @Res() response: Response,
    @Param() getMusicDataParamDto: GetMusicDataParamDto,
  ) {
    const musicObjectMeta = await this.musicService.getMusicObjectMeta(getMusicDataParamDto.id);
    const preAuthedUrl = await this.objectStorageService.getObjectUrl(
      musicObjectMeta.name,
      60 * 60,
    );

    return response.redirect(preAuthedUrl);
  }
}
