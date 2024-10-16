

interface Options {
  id: number
  text: string
  completedAt?: Date | null
}
export class TodoEntity {

  public id: number
  public text: string
  public completedAt?: Date | null

  constructor(options: Options) {
    this.id = options.id
    this.text = options.text
    this.completedAt = options.completedAt
  }

  isCompleted(): boolean {
    return !!this.completedAt
  }

  public static fromObject(object: Options): TodoEntity {
    const { id, text, completedAt } = object
    if (!id) throw 'Id Is required'
    if (!text) throw 'text is required'
    let newCompletedAt;
    
    if (completedAt) {
      newCompletedAt = new Date(completedAt)
      
      if (isNaN(newCompletedAt.getTime())) throw 'CompleteAt is not a valid date'
    } else {
      newCompletedAt = null
    }
    return new TodoEntity({ id, text, completedAt: newCompletedAt })
  }



}