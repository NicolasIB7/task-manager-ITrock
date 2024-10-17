import { Injectable } from '@nestjs/common';
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

  create(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const task = new Tasks();
    task.title = createTaskDto.title;

    return this.tasksRepository.save(task);
  }

  findOne(id: number): Promise<Tasks> {
    return this.tasksRepository.findOneBy({ id: id });
  }

  findAllByUserId(userId: number): Promise<Tasks[]> {
    return this.tasksRepository.find({ where: { userId } });
  }

  async findExternalDataList(): Promise<void> {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log('data: ', data);

    for (const task of data) {
      const newTask = new Tasks();
      newTask.title = task.title;
      newTask.completed = task.completed;
      newTask.id = task.id;
      newTask.userId = task.userId;
      await this.tasksRepository.save(newTask);
    }
  }
}
