import { Server } from "socket.io"
import config from "../../config"
import appConfiguration from "../../app"
import { MongoDBConnection } from "../../databases/mongodb/access/dbConnection"

initializeServer()
  .then(() => {
    console.info(`
    ################################################
      ${config.appName} has been initialized
    ################################################
            `)
  })
  .catch((error: Error) => {
    console.error(error)
    throw error
  })

async function initializeServer(): Promise<void> {
  const server = appConfiguration()

  await MongoDBConnection.initConnection()

  const io = new Server(server, {
    cors: {
      origin: config.frontend.url,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  })

  io.on("connection", (socket) => {
    console.log("user connected", socket.id)
    socket.on("send_message", (data) => {
      console.log("The data being sent", data.message)
      socket.broadcast.emit("recieved_message", data)
    })
  })

  server.listen(config.port || 4000, () => {
    console.log(`
    ################################################
      Express Server listening on port: ${config.port}
    ################################################
    `)
  })
}
