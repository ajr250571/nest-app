import { Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';

export interface Task {
  title: string;
  description: string;
}

@Injectable()
export class TasksService {

  private tasks = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): any {
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      return new NotFoundException(`La Tarea con id: ${id} no fue encontrada.`);
    }
    return taskFound;
  }

  createTask(task: createTaskDto) {
    console.log(task);
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1,
    });
    return task;
  }

  updateTask(task: updateTaskDto) {
    console.log(task);
    return 'Update Task.';
  }

  deleteTask() {
    return 'Delete Task.';
  }

  updateTaskStatus() {
    return 'Update Status Task.';
  }
}
