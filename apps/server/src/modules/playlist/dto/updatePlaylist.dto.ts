import { PlaylistService } from '@music/types';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlaylistParamDto
  implements Pick<PlaylistService.UpdatePlaylistInfoRequest, 'id'>
{
  @IsNumber()
  id: number;
}

export class UpdatePlaylistBodyDto
  implements Omit<PlaylistService.UpdatePlaylistInfoRequest, 'id'>
{
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
