import { Router } from "express"
import { TodoController } from "./controller"
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl"
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl"


export class TodoRoutes {

  static routes = (): Router => {

    const router = Router()
    const datasource = new TodoDataSourceImpl()
    const todoRepository = new TodoRepositoryImpl(datasource)
    const { getAll, getById, deleteTodo, create, update } = new TodoController(todoRepository)

    router.get('/', getAll)
    router.get('/:id', getById)
    router.post('/', create)
    router.put('/:id', update)
    router.delete('/:id', deleteTodo)

    return router
  }
}