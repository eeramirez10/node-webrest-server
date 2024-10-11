import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"



(() => {
  main()
})()


async function main() {

  const server = new Server({
    routes: AppRoutes.routes(),
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH
  })

  server.start()



}