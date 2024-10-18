import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tasks {
  @ApiProperty({ description: 'Unique ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The task title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Task completed or not' })
  @Column({ default: false })
  completed: boolean;

  @ApiProperty({ description: 'User ID' })
  @Column()
  userId: number;
}
