import { PlayHistoryService } from '@music/types';
import { IsNumber } from 'class-validator';

export class SavePlayHistoryParamDto
  implements Pick<PlayHistoryService.SavePlayHistoryRequest, 'id'>
{
  @IsNumber()
  id: number;
}
