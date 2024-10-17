import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: number;
}