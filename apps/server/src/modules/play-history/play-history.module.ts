import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { MusicModule } from '../music/music.module';
import { UserModule } from '../user/user.module';
import { PlayHistory } from './entity/playHistory.entity';
import { PlayHistoryController } from './play-history.controller';
import { PlayHistoryService } from './play-history.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    forwardRef(() => MusicModule),
    TypeOrmModule.forFeature([PlayHistory]),
  ],
  providers: [PlayHistoryService],
  exports: [PlayHistoryService],
  controllers: [PlayHistoryController],
})
export class PlayHistoryModule {}
