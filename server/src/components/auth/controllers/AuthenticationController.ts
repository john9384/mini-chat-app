import { SuccessResponse } from "../../../library/helpers/response"
import { UserRepository } from "../../user/repositories/UserRepository"
import { AuthenticationService } from "../services/AuthenticationService"

const authenticationService = new AuthenticationService(new UserRepository())

class AuthenticationController {
  public async login(req: any, res: any) {
    const form = req.body
    const outcome = await authenticationService.login(form)
    return new SuccessResponse("User signed up successfully", outcome).send(res)
  }
}

export default AuthenticationController
