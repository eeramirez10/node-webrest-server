import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";



// let todos = [
//   { id: 2, text: 'Buy milk', date: new Date() },
//   { id: 3, text: 'Buy bread', date: new Date() },
//   { id: 1, text: 'Buy coke', date: new Date() }
// ]


export class TodoController {

  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public getAll = async (req: Request, res: Response) => {

    new GetTodos(this.todoRepository)
      .execute()
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }))



  }

  public getById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id) as number

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })


    new GetTodo(this.todoRepository)
      .execute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }))


  }


  public create = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDTO.create(req.body)

    if (error !== undefined) return res.status(400).json({ error })

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }))

  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({ error }))


  }


  public update = async (req: Request, res: Response) => {

    const id = +req.params.id

    const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id })

    if (error) return res.status(400).json({ error })

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDTO!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error }))

  }


}