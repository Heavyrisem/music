import { CreateDateColumn, ObjectIdColumn } from 'typeorm';

export class CoreEntity {
  @ObjectIdColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;
}
