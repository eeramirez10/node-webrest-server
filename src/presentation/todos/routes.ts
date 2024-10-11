import { Router } from "express"
import { TodoController } from "./controller"


export class TodoRoutes {

  static routes = (): Router => {

    const router = Router()
    const { getAll, getById, deleteTodo, create, update } = new TodoController()

    router.get('/', getAll)
    router.get('/:id', getById)
    router.post('/', create)
    router.put('/:id', update)
    router.delete('/:id', deleteTodo)

    return router
  }
}