import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService){}

  async create(createTodoDto: CreateTodoDto, email: string){
    try{
      const user = await this.databaseService.user2.findUnique({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
      let data: Prisma.Todo2CreateInput = {
        description : createTodoDto.description,
        task: createTodoDto.task,
        status : 'ACTIVE',
        user: {
          connect: { email: user.email },
        },
      }
      return  this.databaseService.todo2.create({data});
    }catch(err){
      return err
    }
    
  }

  async findAll( userEmail: string) {
    return  this.databaseService.todo2.findMany({
      where:{
        userEmail: userEmail
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.todo2.findFirst({
      where:{
        id: id
      }
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.databaseService.todo2.update({
      where:{
        id:id
      },
      data: updateTodoDto
    });
  }

  async remove(id: number) {
    return this.databaseService.todo2.delete({
      where:{
        id: id
      }
    });
  }
}