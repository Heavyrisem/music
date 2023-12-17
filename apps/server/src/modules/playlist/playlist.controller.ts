import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { User } from '../user/entity/user.entity';
import { AddMusicBodyDto, AddMusicParamDto } from './dto/addMusic.dto';
import { CreatePlaylistBodyDto } from './dto/createPlaylist.dto';
import { GetPlaylistParamDto } from './dto/getPlaylist.dto';
import { UpdatePlaylistBodyDto, UpdatePlaylistParamDto } from './dto/updatePlaylist.dto';
import { PlaylistService } from './playlist.service';

@Controller('/api/playlist')
export class PlaylistController {
  logger = new Logger(PlaylistController.name);
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @UseGuards(LoggedInGuard)
  async getUserPlaylist(@GetUser() user: User) {
    const data = await this.playlistService.findPlaylistByAuthor(user);
    return BaseResponse.of(data);
  }

  @Get('/:id')
  // @UseGuards(LoggedInGuard)
  async getPlaylistById(@Param() getPlaylistParamDto: GetPlaylistParamDto) {
    const data = await this.playlistService.findPlaylistById(getPlaylistParamDto.id);
    return BaseResponse.of(data);
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async createPlaylist(
    @Body() createPlaylistBodyDto: CreatePlaylistBodyDto,
    @GetUser() user: User,
  ) {
    const data = await this.playlistService.createPlaylist(user, createPlaylistBodyDto);
    return BaseResponse.of(data);
  }

  @Put('/:id')
  @UseGuards(LoggedInGuard)
  async updatePlaylist(
    @Param() updatePlaylistParamDto: UpdatePlaylistParamDto,
    @Body() updatePlaylistBodyDto: UpdatePlaylistBodyDto,
    @GetUser() user: User,
  ) {
    const existPlaylist = await this.playlistService.findPlaylistById(updatePlaylistParamDto.id);
    if (existPlaylist.author.id !== user.id)
      throw new ForbiddenException('플레이리스트 수정 권한이 없습니다.');

    const data = await this.playlistService.updatePlaylist({
      ...updatePlaylistParamDto,
      ...updatePlaylistBodyDto,
    });
    return BaseResponse.of(data);
  }

  @Put('/:playlistId/music')
  @UseGuards(LoggedInGuard)
  async addMusic(
    @Param() addMusicParamDto: AddMusicParamDto,
    @Body() addMusicBodyDto: AddMusicBodyDto,
    @GetUser() user: User,
  ) {
    const playlist = await this.playlistService.findPlaylistById(addMusicParamDto.playlistId);
    if (playlist.author.id !== user.id) throw new ForbiddenException();

    const data = await this.playlistService.addMusic({ ...addMusicParamDto, ...addMusicBodyDto });
    return BaseResponse.of(data);
  }
}
