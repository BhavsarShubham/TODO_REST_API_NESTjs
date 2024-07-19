import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
// import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[DatabaseModule, AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}