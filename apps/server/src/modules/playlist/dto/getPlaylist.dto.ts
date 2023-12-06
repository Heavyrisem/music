import { PlaylistService } from '@music/types';
import { IsNumber } from 'class-validator';

export class GetPlaylistParamDto implements Pick<PlaylistService.GetPlaylistInfoRequest, 'id'> {
  @IsNumber()
  id: number;
}
