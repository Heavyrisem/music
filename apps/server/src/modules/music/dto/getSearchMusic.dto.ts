import { MusicService } from '@music/types';
import { IsNotEmpty, IsString } from 'class-validator';
import { DtoToString } from 'src/libs/util/dto';

export class GetSearchMusicDto extends DtoToString implements MusicService.GetSearchMusicRequest {
  @IsString()
  @IsNotEmpty()
  query: string;
}
