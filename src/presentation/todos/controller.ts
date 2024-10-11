import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { error } from "console";
import { CreateTodoDTO } from "../../domain/dtos";


// let todos = [
//   { id: 2, text: 'Buy milk', date: new Date() },
//   { id: 3, text: 'Buy bread', date: new Date() },
//   { id: 1, text: 'Buy coke', date: new Date() }
// ]


export class TodoController {

  constructor() { }

  public getAll = async (req: Request, res: Response) => {

    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } })

    res.json(todos)

  }

  public getById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id) as number

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })
    // const findTodo = [...todos].find(todo => todo.id === id)
    // if (findTodo === undefined) return res.status(404).json({ error: true })

    const findTodo = await prisma.todo.findMany({ where: { id } })
    if (Object.keys(findTodo).length === 0) return res.status(404).json({ error: true })

    return res.json(findTodo)

  }


  public create = async (req: Request, res: Response) => {

    const [error, createTodoDto] = CreateTodoDTO.create(req.body)

    if(error !== undefined) return res.status(400).json({ error })


    const todo = await prisma.todo.create({ data: createTodoDto!.toPlainObject()})

    return res.json(todo)
  }

  public deleteTodo = async (req: Request, res: Response) => {

    const id = +req.params.id

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })

    const findTodo = await prisma.todo.findMany({ where: { id } })

    if (Object.keys(findTodo).length === 0) return res.status(400).json({ error: 'todo not found' })

    const todo = await prisma.todo.delete({ where: { id } })

    console.log(todo)

    res.json(todo)

  }


  public update = async (req: Request, res: Response) => {

    const id = +req.params.id

    if (!Number(id)) return res.status(400).json({ msg: 'Not a number' })


    const { text } = req.body

    if (!text) return res.status(400).json({ error: 'Text property is required' })

    const findTodo = await prisma.todo.findMany({ where: { id } })

    if (Object.keys(findTodo).length === 0) return res.status(400).json({ error: 'todo not find' })

    // let todo = todos[findTodo]

    // todo = {
    //   id: todo.id,
    //   text,
    //   date: todo.date
    // }

    // todos[findTodo] = todo

    // todos = [...todos]

    const todo = await prisma.todo.update({ data: { text }, where: { id } })


    res.json(todo)

  }


}