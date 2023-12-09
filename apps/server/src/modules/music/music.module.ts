import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { PlayHistory } from '../play-history/entity/playHistory.entity';
import { UserModule } from '../user/user.module';
import { MusicMeta } from './entity/musicMeta.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  imports: [
    AuthModule,
    ObjectStorageModule,
    UserModule,
    TypeOrmModule.forFeature([MusicMeta, PlayHistory]),
  ],
  providers: [MusicService],
  exports: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
