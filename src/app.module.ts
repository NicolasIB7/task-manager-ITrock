import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './database/database.module';

@Module({
  imports: [TasksModule, HttpModule, AuthModule, UsersModule, DbModule],
})
export class AppModule {}
