import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.subtasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: false,
  })
  taskId: number;

  @ManyToOne(() => Task, (task) => task.subtasks)
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
