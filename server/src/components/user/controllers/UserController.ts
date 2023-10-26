import { SuccessResponse } from "../../../library/helpers/response"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../services/UserService"

const userService = new UserService(new UserRepository())

export class UserController {
  public async getCurrentUser(req: any, res: any) {
    const userId = req.user.id
    const outcome = await userService.read({ id: userId })
    return new SuccessResponse("User fetched", outcome).send(res)
  }
}

export default UserController
