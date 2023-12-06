import { MusicService } from '@music/types';
import { IsNumber } from 'class-validator';

export class GetMusicDataParamDto implements MusicService.GetMusicDataRequest {
  @IsNumber()
  id: number;
}
