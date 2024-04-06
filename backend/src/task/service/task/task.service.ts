import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { buildCompletedTask } from 'src/task/utils/buildCompletedTask';
import * as moment from 'moment';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTaskByUserId(userId: number) {
    return await this.taskRepository.find({
      where: { userId },
      relations: ['block'],
    });
  }
  // getTaskById
  async getTaskById(id: number, userId: number) {
    try {
      return await this.taskRepository.findOneOrFail({
        where: { id, userId },
      });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
  }

  // getUnassignedTask
  async getAllUnassignedTask(userId) {
    return await this.taskRepository.find({
      where: { blockId: IsNull(), userId },
    });
  }

  // MakeaTask
  async createNewTask(createTaskDto: CreateTaskDto, userId: number) {
    const newTask = await this.taskRepository.create({
      ...createTaskDto,
      userId,
    });
    return this.taskRepository.save(newTask);
  }

  // EditATask
  async editTask(id: number, createTaskDto: CreateTaskDto, userId) {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    task.blockId = createTaskDto.blockId; // This can be null
    if (createTaskDto.blockId === 0) task.blockId = null;

    await this.taskRepository.save(task);

    return this.taskRepository.findOne({ where: { id } });
  }

  // Mark a Task Completed
  async completeTask(id: number, userId) {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    const completedTask = buildCompletedTask(task);

    await this.taskRepository.update(id, completedTask);

    return this.taskRepository.findOne({ where: { id } });
  }

  // activate reoccuring task
  async activateReoccuringTask(userId) {
    const today = moment().startOf('day').toDate();
    const tasks = await this.taskRepository.find({
      where: {
        nextActiveOn: LessThanOrEqual(today),
        status: true,
        userId,
      },
    });

    for (const task of tasks) {
      await this.taskRepository.update(task.id, { status: false });
    }
  }

  // DeleteATask
  async deleteTask(id: number, userId: number) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId })
      .andWhere('task.id = :id', { id })
      .getOne();
    const taskTitle = task.title;
    if (task) {
      try {
        await this.taskRepository.delete(id);
        return { message: `'${taskTitle}' was deleted successfully` };
      } catch (err) {
        console.error(err);
        throw new BadRequestException(
          `There was an error deleting ${taskTitle} `,
        );
      }
    }
    throw new NotFoundException(`No task with the id ${id} was found`);
  }
}
