import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain";



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

    // const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } })

    try {
      const todos = await this.todoRepository.getAll()

      res.json(todos)

    } catch (error) {
      res.status(500).json({ error })
    }



  }

  public getById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id) as number

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })

    try {

      const todo = await this.todoRepository.findById(id)

      return res.json(todo)

    } catch (error) {
      res.status(400).json({ error })
    }


  }


  public create = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDTO.create(req.body)

    if (error !== undefined) return res.status(400).json({ error })

    try {
      const todo = await prisma.todo.create({ data: createTodoDto!.toPlainObject() })

      return res.json(todo)

    } catch (error) {
      res.status(400).json({ error })
    }

  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })

    try {
      const deletedTodo = await this.todoRepository.deleteById(id)

      res.json(deletedTodo)

    } catch (error) {
      res.status(400).json({ error })
    }



  }


  public update = async (req: Request, res: Response) => {

    const id = +req.params.id

    const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id })

    if (error) return res.status(400).json({ error })


    // const findTodo = await prisma.todo.findMany({ where: { id } })

    // if (Object.keys(findTodo).length === 0) return res.status(404).json({ error: 'todo not found' })

    // const todo = await prisma.todo.update({ data: updateTodoDTO!.values(), where: { id } })


    // res.json(todo)

    try {

      const updatedTodo = await this.todoRepository.updateById(updateTodoDTO!)

      res.json(updatedTodo)

    } catch (error) {
      res.status(400).json({ error })
    }

  }


}