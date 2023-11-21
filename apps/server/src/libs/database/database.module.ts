import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      // logging: process.env.NODE_ENV === 'production',
      // dropSchema: process.env.NODE_ENV !== 'production',
      //   entities: [],
    }),
  ],
})
export class DatabaseModule {}
