import { Body, Controller, ForbiddenException, Get, Post, Put, UseGuards } from '@nestjs/common';

import { BaseResponse } from 'src/libs/common/dto/response.dto';

import { GetUser } from '../auth/decorator/get-user.decorator';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { User } from '../user/entity/user.entity';
import { AddMusicDto } from './dto/addMusic.dto';
import { CreatePlaylistDto } from './dto/createPlaylist.dto';
import { PlaylistService } from './playlist.service';

@Controller('/api/playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  @UseGuards(LoggedInGuard)
  async getUserPlaylist(@GetUser() user: User) {
    const data = await this.playlistService.findPlaylistByAuthor(user);
    return BaseResponse.of(data);
  }

  @Post()
  @UseGuards(LoggedInGuard)
  async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto, @GetUser() user: User) {
    const data = this.playlistService.createPlaylist(user, createPlaylistDto);

    return BaseResponse.of(data);
  }

  @Put()
  @UseGuards(LoggedInGuard)
  async addMusic(@Body() addMusicDto: AddMusicDto, @GetUser() user: User) {
    const playlist = await this.playlistService.findPlaylistById(addMusicDto.playlistId);
    if (playlist.author.id !== user.id) throw new ForbiddenException();

    const data = await this.playlistService.addMusic(addMusicDto);
    return BaseResponse.of(data);
  }
}
