import { PlaylistService } from '@music/types';
import { IsNumber } from 'class-validator';

export class AddMusicParamDto
  implements Pick<PlaylistService.AddMusicToPlaylistRequest, 'playlistId'>
{
  @IsNumber()
  playlistId: number;
}

export class AddMusicBodyDto implements Pick<PlaylistService.AddMusicToPlaylistRequest, 'musicId'> {
  @IsNumber()
  musicId: PlaylistService.AddMusicToPlaylistRequest['musicId'];
}
