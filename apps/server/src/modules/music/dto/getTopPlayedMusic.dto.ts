import { MusicService } from '@music/types';
import { IsNumber, IsOptional } from 'class-validator';

export class GetTopPlayedMusicQueryDto implements MusicService.GetTopPlayedMusicRequest {
  @IsNumber()
  @IsOptional()
  maxCount?: number;
}
