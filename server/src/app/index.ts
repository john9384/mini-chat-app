import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import routes from "./routes"
import cookieParser from "cookie-parser"
import http from "http"
import https from "https"
import path from "path"
import methodOverride from "method-override"
import config from "../config"
import {
  ApiError,
  InternalError,
  NotFoundError,
} from "../library/helpers/error"

function errorHandler(err: any, req: Request, res: Response) {
  console.error(err.err)
  return res.status(500).send({ error: err.message })
}

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
  app.use(methodOverride())
  app.use(helmet())
  app.set("trust proxy", 1)
  app.use("/", routes)

  // catch 404 and forward to error handler
  app.use((_req, _res, next) => next(new NotFoundError()))

  // Middleware Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`${JSON.stringify(err)}`)
    if (err instanceof ApiError) {
      console.log(err)
      return ApiError.handle(err, res)
    } else {
      console.log(err)
      if (process.env.NODE_ENV === "development") {
        console.error(err)
        return res.status(500).send(err.message)
      }
      return ApiError.handle(new InternalError(), res)
    }
  })

  return process.env.NODE_ENV === "production"
    ? https.createServer(app)
    : http.createServer(app)
}
