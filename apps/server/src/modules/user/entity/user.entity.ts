import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity implements Model.UserInfo {
  @Column({ type: 'enum', enum: Model.Provider, nullable: false })
  provider: Model.Provider;

  @Column({ nullable: false })
  providerId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  profileImage: string;
}
