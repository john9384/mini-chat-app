import express from "express"
import { OnboardingController, AuthenticationController } from "../controllers"
import { errorCatcher } from "../../../library/helpers/errorCatcher"

const onboardingController = new OnboardingController()
const authenticationController = new AuthenticationController()
const authRouter = express.Router()

authRouter.post("/signup", errorCatcher(onboardingController.signup))
authRouter.post("/login", errorCatcher(authenticationController.login))

export { authRouter }
