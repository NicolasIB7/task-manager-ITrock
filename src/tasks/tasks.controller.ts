import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './entities/task.entity';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':userId')
  findAllByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Tasks[]> {
    return this.tasksService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tasks> {
    return this.tasksService.findOne(id);
  }

  @Get('populate')
  async findExternalData(): Promise<any> {
    return this.tasksService.findExternalDataList();
  }
}

