
interface Options {
  text: string
  completedAt: Date;
}


interface CreateProps {
  text: string;
  completedAt?: Date | null;
}

export class CreateTodoDTO {

  private readonly text: string
  private readonly completedAt: Date | null;

  constructor(options: Options) {
    this.text = options.text
    this.completedAt = options.completedAt
  }

  static create(props: CreateProps): [string?, CreateTodoDTO?] {
    const { text, completedAt } = props




    if (!text) return ['Text property is required']
    if (completedAt !== null && completedAt !== undefined) {

      if (!this.isValidDate(completedAt)) return ['Invalid Date']
    }

    const validCompletedAt =
      completedAt ?
        new Date(props.completedAt!) :
        new Date()


    return [undefined, new CreateTodoDTO({ text, completedAt: validCompletedAt })]

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