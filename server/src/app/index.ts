import express from "express"
import cors from "cors"
import helmet from "helmet"
import routes from "./routes"
import cookieParser from "cookie-parser"
import http from "http"
import https from "https"
import path from "path"
import config from "../config"

export default function () {
  const app = express()

  app.use(express.static(path.join(__dirname, "../../public")))
  app.use(
    cors({
      origin: [config.frontend.url as string],
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  )
  app.use(express.json({ limit: "2mb" }))
  app.use(
    express.urlencoded({
      limit: "2mb",
      extended: true,
    })
  )
  app.use(cookieParser())
  app.use(helmet())
  app.set("trust proxy", 1)
  app.use("/", routes)

  return process.env.NODE_ENV === "production"
    ? https.createServer(app)
    : http.createServer(app)
}
