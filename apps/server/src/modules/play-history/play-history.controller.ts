import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { User } from '../user/entity/user.entity';
import { GetUserPlayHistoryQuery } from './dto/getUserPlayHistory.dto';
import { SavePlayHistoryParamDto } from './dto/savePlayHistory.dto';
import { PlayHistoryService } from './play-history.service';

@Controller('/api/play-history')
export class PlayHistoryController {
  constructor(private readonly playHistoryService: PlayHistoryService) {}

  @Get()
  @UseGuards(LoggedInGuard)
  async getRecentMusicsForUser(
    @Query() getUserPlayHistoryQuery: GetUserPlayHistoryQuery,
    @GetUser() user: User,
  ) {
    const data = await this.playHistoryService.findRecentMusicsByUserId(
      user.id,
      getUserPlayHistoryQuery,
    );

    return BaseResponse.of(data.map(({ music }) => music));
  }

  @Post('/:id')
  @UseGuards(LoggedInGuard)
  async savePlayHistory(
    @Param() savePlayHistoryParamDto: SavePlayHistoryParamDto,
    @GetUser() user: User,
  ) {
    await this.playHistoryService.savePlayHistory(savePlayHistoryParamDto.id, user.id);
    return BaseResponse.of({});
  }
}
