import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MusicMeta } from './entity/musicMeta.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([MusicMeta])],
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
