import express from "express"
import { authRouter } from "../components/auth/routes"
import { userRouter } from "../components/user/routes"

const router = express.Router()

router.get("/", (_, res) => {
  res.status(200).send({ msg: "Api running " })
})

router.use("/auth", authRouter)
router.use("/users", userRouter)
export default router
