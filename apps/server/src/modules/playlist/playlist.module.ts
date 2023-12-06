import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MusicModule } from '../music/music.module';
import { Playlist } from './entity/playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), MusicModule, AuthModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
