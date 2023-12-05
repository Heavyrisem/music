import { ImageService } from '@music/types';
import { IsNumber } from 'class-validator';

export class GetImageParamDto implements ImageService.GetImageRequest {
  @IsNumber()
  thumbnailId: number;
}
