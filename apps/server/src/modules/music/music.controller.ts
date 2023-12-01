import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';

import { Model } from '@music/types';
import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { GetSearchMusicDto } from './dto/GetSearchMusic.dto';
import { MusicService } from './music.service';

@Controller('/api/music')
export class MusicController {
  logger = new Logger(MusicController.name);

  constructor(private readonly musicService: MusicService) {}

  @Get('/search')
  // @UseGuards(LoggedInGuard)
  async searchMusic(@Query() getSearchMusicDto: GetSearchMusicDto) {
    const data = await this.musicService.searchMusic(getSearchMusicDto);
    return BaseResponse.of(data);
  }
}
