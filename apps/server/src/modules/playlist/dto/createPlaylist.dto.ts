import { PlaylistService } from '@music/types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaylistBodyDto implements PlaylistService.CreatePlaylistRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  thumbnailId: number;
}
