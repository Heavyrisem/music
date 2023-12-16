import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Entity, ManyToOne } from 'typeorm';

import { MusicMeta } from '../../music/entity/musicMeta.entity';

@Entity()
export class PlayHistory extends CoreEntity implements Model.PlayHistoryInfo {
  @ManyToOne(() => MusicMeta, (music) => music.id, { nullable: false })
  music: MusicMeta;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
}
