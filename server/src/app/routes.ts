import express from "express"

const router = express.Router()

router.get("/", (_, res) => {
  res.status(200).send({ msg: "Api running " })
})

export default router
