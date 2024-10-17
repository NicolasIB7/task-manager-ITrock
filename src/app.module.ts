import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TasksModule} from './tasks/tasks.module'
import { HttpModule } from '@nestjs/axios';
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    autoLoadEntities: true,
  }),
  TasksModule,
  HttpModule,
  AuthModule
]
})
export class AppModule {}
