import { ImageService } from '@music/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageBodyDto
  implements Pick<ImageService.UplaodImageRequest, 'filename' | 'path'>
{
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}
