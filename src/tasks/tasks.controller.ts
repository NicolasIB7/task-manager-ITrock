import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  ParseIntPipe,
  Request
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './entities/task.entity';
import { TaskService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {}

  @Post()
  create(@Request() req,@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    const userId = req.user.sub;
    return this.tasksService.create(userId,createTaskDto);
  }

  @Get()
  findAllByUserId(@Request() req): Promise<Tasks[]> {
    const userId = req.user.id;
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

