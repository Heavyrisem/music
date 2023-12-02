import { Model } from '@music/types';
import { CoreEntity } from 'src/libs/database/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity implements Model.UserInfo {
  @Column({ type: 'enum', enum: Model.Provider, nullable: false })
  provider: Model.Provider;

  @Column({ nullable: false })
  providerId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  disaplyName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  profileImage: string;

  @BeforeUpdate()
  @BeforeInsert()
  beforeSave() {
    if (!this.disaplyName) this.disaplyName = this.name;
  }
}
