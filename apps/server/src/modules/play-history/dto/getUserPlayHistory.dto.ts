import { PlayHistoryService } from '@music/types';
import { IsNumber, IsOptional } from 'class-validator';

export class GetUserPlayHistoryQuery
  implements Pick<PlayHistoryService.GetUserPlayHistoryRequest, 'maxCount'>
{
  @IsNumber()
  @IsOptional()
  maxCount?: number;
}
