import express from "express"
import { authenticate } from "../../../library/middlewares/authentication"
import { errorCatcher } from "../../../library/helpers/errorCatcher"
import UserController from "../controllers/UserController"

const userController = new UserController()
const userRouter = express.Router()

userRouter.get(
  "/current/user",
  authenticate,
  errorCatcher(userController.getCurrentUser)
)

export { userRouter }
