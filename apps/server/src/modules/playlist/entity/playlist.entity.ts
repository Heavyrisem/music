import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { MusicMeta } from 'src/modules/music/entity/musicMeta.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Playlist extends CoreEntity implements Model.PlaylistDetail {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => User, (author) => author.id)
  author: User;

  @Column({ nullable: false })
  coverImageUrl: string;

  @ManyToMany(() => MusicMeta, (music) => music.id)
  musicList: MusicMeta[];
}
