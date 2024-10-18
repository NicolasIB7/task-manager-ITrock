import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  ParseIntPipe,
  Request,
  Delete,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './entities/task.entity';
import { TaskService } from './tasks.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'La tarea fue creada.',
    type: Tasks,
  })
  create(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    const userId = req.user.sub;
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Search for tasks belonging to authenticated users',
  })
  @ApiResponse({ status: 201, type: Tasks })
  findAllByUserId(@Request() req): Promise<Tasks[]> {
    const userId = req.user.sub;
    console.log(userId);
    return this.tasksService.findAllByUserId(userId);
  }

  @Get('/populate')
  @ApiOperation({ summary: 'Get and save external data tasks' })
  @ApiResponse({
    status: 201,
    description: 'Successfully saved tasks',
    type: Tasks,
  })
  async findExternalData() {
    return this.tasksService.findExternalDataList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific task by ID' })
  @ApiResponse({ status: 201, description: 'The task was found', type: Tasks })
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub;
    return this.tasksService.findOne(userId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete specific task by ID' })
  @ApiResponse({
    status: 201,
    description: 'The task was deleted',
    type: Tasks,
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
