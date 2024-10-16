
interface Options {
  id: number
  text?: string
  completedAt?: Date;
}


interface CreateProps {
  id: number
  text?: string;
  completedAt?: Date | null;
}

interface Values {
  id?: number
  text?: string;
  completedAt?: Date | null;
}

export class UpdateTodoDTO {
  public readonly id: number
  private readonly text?: string
  private readonly completedAt?: Date | null;

  constructor(options: Options) {
    this.text = options.text
    this.completedAt = options.completedAt
    this.id = options.id
  }

  values() {
    const returnObj: Values = {}

    if (this.text) returnObj.text = this.text
    if (this.completedAt) returnObj.completedAt = this.completedAt

    return returnObj
  }

  static create(props: CreateProps): [string?, UpdateTodoDTO?] {
    const { text, completedAt, id } = props


    if (isNaN(Number(id))) return ['Id must be an integer']
    if (!id) return ['Id id required']
    if (!text) return ['Text property is required']
    if (completedAt !== null && completedAt !== undefined) {

      if (!this.isValidDate(completedAt)) return ['Invalid Date']
    }

    const validCompletedAt =
      completedAt ?
        new Date(props.completedAt!) :
        new Date()


    return [undefined, new UpdateTodoDTO({ text, completedAt: validCompletedAt, id })]

  }

  static isValidDate(value: Date): boolean {
    const date = new Date(value)

    console.log(date)

    return !isNaN(date.getTime())
  }

  toPlainObject() {
    return {
      text: this.text,
      completedAt: this.completedAt
    }
  }

}