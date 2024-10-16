import { prisma } from '../../data/postgres';
import { CreateTodoDTO, TodoEntity, UpdateTodoDTO, TodoDataSource } from '../../domain';



export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto!.toPlainObject() })
    return TodoEntity.fromObject(todo)
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } })

    return todos.map(todo => TodoEntity.fromObject({ ...todo }))
  }
  async findById(id: number): Promise<TodoEntity> {
    const findTodo = await prisma.todo.findFirst({ where: { id } })
    if (!findTodo) throw `Todo with id ${id} not found`
    return TodoEntity.fromObject(findTodo)
  }
  async updateById(updateTodoDto: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id)

    const updateTodo = await prisma.todo.update({ data: updateTodoDto!.values(), where: { id: updateTodoDto.id } })

    return TodoEntity.fromObject({ ...updateTodo })
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id)

    const deleted = await prisma.todo.delete({ where: { id } })

    return TodoEntity.fromObject(deleted)
  }

}