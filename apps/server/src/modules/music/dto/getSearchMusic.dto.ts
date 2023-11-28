import { MusicService } from '@music/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetSearchMusicDto implements MusicService.GetSearchMusicRequest {
  @IsString()
  @IsNotEmpty()
  query: string;
}
