import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskController } from './task.controller';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [AppService],
})
export class AppModule {}
