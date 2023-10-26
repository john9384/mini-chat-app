import { SuccessResponse } from "../../../library/helpers/response"
import { UserRepository } from "../../user/repositories/UserRepository"
import { OnboardingService } from "../services/OnboardingService"

const onboardingService = new OnboardingService(new UserRepository())

class OnboardingController {
  public async signup(req: any, res: any) {
    const form = req.body
    const outcome = await onboardingService.signup(form)
    return new SuccessResponse("User signed up successfully", outcome).send(res)
  }
}

export default OnboardingController
