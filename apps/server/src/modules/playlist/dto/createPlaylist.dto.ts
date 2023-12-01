import { PlaylistService } from '@music/types';
import { IsString } from 'class-validator';

export class CreatePlaylistDto implements PlaylistService.CreatePlaylistRequest {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  coverImageUrl: string;
}
