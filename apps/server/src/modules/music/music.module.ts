import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  imports: [AuthModule],
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
