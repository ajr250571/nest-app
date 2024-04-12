import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: any) {
    console.log(query);
    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: String) {
    return this.tasksService.getTask(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTask(@Body() task: createTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put()
  updateTask(@Body() task: updateTaskDto) {
    return this.tasksService.updateTask(task);
  }

  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }

  @Patch()
  updateTaskStatus() {
    return this.tasksService.updateTaskStatus();
  }
}
