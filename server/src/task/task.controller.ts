import { Controller, Get } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //   @Get()
  //   getHello(): string {
  //     return this.appService.getHello();
  //   }
}
