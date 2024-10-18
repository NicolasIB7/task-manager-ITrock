import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks } from './entities/task.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
    private readonly httpService: HttpService,
  ) {}

  create(userId: number, createTaskDto: CreateTaskDto): Promise<Tasks> {
    const task = new Tasks();
    task.title = createTaskDto.title;
    task.userId = userId;

    return this.tasksRepository.save(task);
  }

  async findOne(userId: number, id: number): Promise<Tasks> {
    const task = await this.tasksRepository.findOneBy({ id: id });
    console.log(task);
    if (!task || task.userId !== userId) {
      throw new NotFoundException(
        'La tarea no fue encontrada o no pertenece al usuario.',
      );
    }
    return task;
  }

  async findExternalDataList(): Promise<void> {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    console.log(url);

    const { data } = await firstValueFrom(this.httpService.get(url));

    for (const task of data) {
      const newTask = new Tasks();
      newTask.title = task.title;
      newTask.completed = task.completed;
      newTask.userId = task.userId;

      try {
        await this.tasksRepository.save(newTask);
      } catch (error) {
        console.error(`Error saving task ${task.id}:`, error);
      }
    }
  }

  findAllByUserId(userId: number): Promise<Tasks[]> {
    console.log(userId);
    return this.tasksRepository.find({ where: { userId } });
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
