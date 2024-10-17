import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import {TasksController} from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  providers:[TaskService],
  controllers:[TasksController],
})
export class TasksModule {}
