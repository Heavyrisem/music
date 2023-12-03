import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ObjectStorage } from './entity/objectStorage.entity';
import { ObjectStorageService } from './object-storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectStorage])],
  exports: [ObjectStorageService],
  providers: [ObjectStorageService],
})
export class ObjectStorageModule {}
