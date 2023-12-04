import {
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BaseResponse } from 'src/libs/common/dto/response.dto';
import { Readable } from 'stream';

import { ObjectStorageService } from '../object-storage/object-storage.service';

@Controller('/api/image')
export class ImageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Get('/:thumbnailId')
    async getImage()

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const filePath = ['thumbnails', `${Date.now()}-${file.originalname}`].join('/');

    const objectMeta = await this.objectStorageService.save(
      Readable.from(file.buffer),
      filePath,
      'image',
    );

    const data = await this.objectStorageService.getPreAuthedUrl(objectMeta.name, 60 * 60 * 24);
    return BaseResponse.of(data);
  }
}
