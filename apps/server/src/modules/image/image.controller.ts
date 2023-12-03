import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ObjectStorageService } from '../object-storage/object-storage.service';
import { UploadImageBodyDto } from './dto/uploadImage.dto';

@Controller('/api/image')
export class ImageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body() uplaodImageBodyDto: UploadImageBodyDto,
    @UploadedFile()
    file: Express.Multer.File,
    //   new ParseFilePipe({
    //     validators: [new FileTypeValidator({ fileType: 'image' })],
    //   }),
  ) {
    console.log(uplaodImageBodyDto, file);
  }
}
