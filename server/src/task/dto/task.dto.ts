import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';

export class TaskDto implements Task {
  constructor(task: Task) {
    this.id = task.id;
    this.name = task.name;
    this.completed = task.completed;
    this.description = task.description;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  description: string | null;
}
