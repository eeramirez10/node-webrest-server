
import express, { Router } from 'express'
import compression from 'compression'
import path from 'path'


interface Options {
  port: number
  routes: Router
  publicPath: string
}

export class Server {

  private app = express()

  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor(options: Options) {
    this.port = options.port
    this.publicPath = options.publicPath
    this.routes = options.routes
  }

  async start() {


    //Middlewares
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(compression())

    //Public Folder
    this.app.use(express.static(this.publicPath))



    // Routes

    this.app.use(this.routes)


    this.app.get('*', (req, res) => {

      const idexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)

      res.sendFile(idexPath)
    })

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

}