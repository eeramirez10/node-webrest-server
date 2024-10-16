import { CreateTodoDTO, UpdateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDataSource {

  abstract create(createTodoDto: CreateTodoDTO): Promise<TodoEntity>
  abstract getAll(): Promise<TodoEntity[]>
  abstract findById(id: number): Promise<TodoEntity>
  abstract updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity>
  abstract deleteById(id: number): Promise<TodoEntity>
  


}