import { CoreEntity } from 'src/libs/database/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ObjectStorage extends CoreEntity {
  @Column({ nullable: false })
  name: string;
}
