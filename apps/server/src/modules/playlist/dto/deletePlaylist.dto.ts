import { PlaylistService } from '@music/types';
import { IsNumber } from 'class-validator';

export class DeletePlaylistParamDto implements PlaylistService.DeletePlaylistRequest {
  @IsNumber()
  id: number;
}
