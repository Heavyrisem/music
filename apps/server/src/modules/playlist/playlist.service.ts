import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from '@music/types';
import { Repository } from 'typeorm';

import { MusicService } from '../music/music.service';
import { User } from '../user/entity/user.entity';
import { AddMusicBodyDto, AddMusicParamDto } from './dto/addMusic.dto';
import { CreatePlaylistBodyDto } from './dto/createPlaylist.dto';
import { DeletePlaylistParamDto } from './dto/deletePlaylist.dto';
import { UpdatePlaylistBodyDto, UpdatePlaylistParamDto } from './dto/updatePlaylist.dto';
import { Playlist } from './entity/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
    private readonly musicService: MusicService,
  ) {}

  async createPlaylist(author: User, createPlaylistDto: CreatePlaylistBodyDto) {
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      author,
    });

    return await this.playlistRepository.save(playlist);
  }

  async deletePlaylist(deletePlaylistParamDto: DeletePlaylistParamDto) {
    const playlist = await this.findPlaylistById(deletePlaylistParamDto.id);
    if (!playlist) throw new NotFoundException('존재하지 않는 플레이리스트입니다.');

    return await this.playlistRepository.remove(playlist);
  }

  async updatePlaylist(updatePlaylistDto: UpdatePlaylistParamDto & UpdatePlaylistBodyDto) {
    const playlist = await this.findPlaylistById(updatePlaylistDto.id);
    if (!playlist) throw new NotFoundException('존재하지 않는 플레이지리스트입니다.');

    const saveResult = await this.playlistRepository.save({
      ...playlist,
      ...updatePlaylistDto,
    });

    return saveResult;
  }

  async addMusic(addMusicDto: AddMusicBodyDto & AddMusicParamDto) {
    const playlist = await this.findPlaylistById(addMusicDto.playlistId);
    if (!playlist) throw new NotFoundException('존재하지 않는 플레이리스트입니다.');
    const music = await this.musicService.findMusicById(addMusicDto.musicId);
    if (!music) throw new NotFoundException('존재하지 않는 음악입니다.');

    if (playlist.musicList.some((musicItem) => music.id === musicItem.id)) return playlist;

    playlist.musicList.push(music);
    return this.playlistRepository.save(playlist);
  }

  async findPlaylistById(id: Model.PlaylistInfo['id']) {
    return await this.playlistRepository.findOne({
      where: { id },
      relations: {
        author: true,
        musicList: true,
      },
    });
  }

  async findPlaylistByAuthor(author: User) {
    return await this.playlistRepository.find({
      where: {
        author: {
          id: author.id,
        },
      },
      relations: {
        musicList: true,
      },
    });
  }
}
