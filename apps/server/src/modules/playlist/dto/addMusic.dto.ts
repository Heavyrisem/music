import { PlaylistService } from '@music/types';
import { IsNumber } from 'class-validator';

export class AddMusicDto implements PlaylistService.AddMusicRequest {
  @IsNumber()
  playlistId: PlaylistService.AddMusicRequest['playlistId'];

  @IsNumber()
  musicId: PlaylistService.AddMusicRequest['musicId'];
}
