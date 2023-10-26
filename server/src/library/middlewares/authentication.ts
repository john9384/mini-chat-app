import { Request, Response, NextFunction } from "express"
import { TokenExpiredError, AccessTokenError } from "../helpers/error"
import { JWT } from "../helpers/jwt"

export const authenticate = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) throw new AccessTokenError("Invalid Token")

    const decodedToken = JWT.decrypt(token)
    req.user = decodedToken

    return next()
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      next(new AccessTokenError(e.message))
    }
    next(e)
  }
}
