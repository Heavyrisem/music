import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Model } from '@music/types';
import { Repository } from 'typeorm';

import { MusicService } from '../music/music.service';
import { User } from '../user/entity/user.entity';
import { AddMusicDto } from './dto/addMusic.dto';
import { CreatePlaylistDto } from './dto/createPlaylist.dto';
import { Playlist } from './entity/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>,
    private readonly musicService: MusicService,
  ) {}

  async createPlaylist(author: User, createPlaylistDto: CreatePlaylistDto) {
    const playlist = this.playlistRepository.create({
      ...createPlaylistDto,
      author,
    });

    return await this.playlistRepository.save(playlist);
  }

  async addMusic(addMusicDto: AddMusicDto) {
    const playlist = await this.playlistRepository.findOneBy({ id: addMusicDto.playlistId });
    if (!playlist) throw new NotFoundException('존재하지 않는 플레이리스트입니다.');
    const music = await this.musicService.findMusicById(addMusicDto.musicId);
    if (!music) throw new NotFoundException('존재하지 않는 음악입니다.');

    if (playlist.musicList.some((musicItem) => music.id === musicItem.id)) return playlist;

    playlist.musicList.push(music);
    return this.playlistRepository.save(playlist);
  }

  async findPlaylistById(id: Model.PlaylistDetail['id']) {
    return await this.playlistRepository.findOneBy({ id });
  }

  async findPlaylistByAuthor(author: User) {
    return await this.playlistRepository.findBy({ author });
  }
}
