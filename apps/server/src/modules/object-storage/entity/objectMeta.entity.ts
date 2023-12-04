import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class ObjectMeta extends CoreEntity implements Model.ObjectMetaInfo {
  @Index({ unique: true })
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;
}
