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
  @UseGuards(LoggedInGuard)
  async searchMusic(@Query() query: GetSearchMusicDto) {
    this.logger.log(query);

    const thumbnailUrl =
      'https://lh3.googleusercontent.com/bm0WFPaXBYSnv9g0qNffrErNV8yn_9dkRneuKEjynUUjy9giC6E6zZZ7Op4jWLGDlkHRCk5M68aWlLp9=w60-h60-l90-rj';
    const mockData: Model.MusicInfo[] = [
      { title: '제목-1', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-2', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-3', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-4', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-5', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-6', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-7', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-8', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-9', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-10', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-11', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-12', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-13', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-14', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
      { title: '제목-15', artist: '가수', album: '앨범', thumbnailUrl, duration: 120 + 44 },
    ];

    return BaseResponse.of(mockData);
  }
}
