import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma, Task } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The reocrd has beed successfully created',
    type: TaskDto
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const taskCreateInput: Prisma.TaskCreateInput = {
      name: createTaskDto.name,
      completed: false,
    };
    const task = await this.taskService.create(taskCreateInput);
    return new TaskDto(task)
  }

  @Get()
  @ApiOkResponse({
    description: 'The records are found',
    type: [TaskDto]
  })
  findAll() {
    return this.taskService.tasks({});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.task({ id: +id });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.taskService.delete({id});
  }
}
