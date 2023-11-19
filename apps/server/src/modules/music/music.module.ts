import { Module } from '@nestjs/common';

import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
