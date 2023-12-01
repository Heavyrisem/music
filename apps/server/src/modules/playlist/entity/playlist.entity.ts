import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { MusicMeta } from 'src/modules/music/entity/musicMeta.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, ManyToMany } from 'typeorm';

export class Playlist extends CoreEntity implements Model.PlaylistDetail {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column(() => User)
  author: User;

  @Column({ nullable: false })
  coverImageUrl: string;

  @ManyToMany(() => MusicMeta, (music) => music.id)
  musicList: MusicMeta[];
}
