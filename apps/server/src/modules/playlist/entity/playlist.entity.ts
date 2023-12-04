import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { MusicMeta } from 'src/modules/music/entity/musicMeta.entity';
import { ObjectMeta } from 'src/modules/object-storage/entity/objectMeta.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Playlist extends CoreEntity implements Model.PlaylistInfo {
  coverImageUrl: string;
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => User, (author) => author.id)
  author: User;

  @ManyToOne(() => ObjectMeta, (objectMeta) => objectMeta.id)
  thumbnail: ObjectMeta;

  @JoinTable()
  @ManyToMany(() => MusicMeta, (music) => music.id)
  musicList: MusicMeta[];
}
