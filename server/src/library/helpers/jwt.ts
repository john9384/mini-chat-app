import jwt from "jsonwebtoken"
import config from "../../config"

export class JWT {
  static encrypt(payload: any) {
    return jwt.sign(payload, config.jwt.secret as string)
  }

  static decrypt(token: string) {
    return jwt.verify(token, config.jwt.secret as string)
  }
}
