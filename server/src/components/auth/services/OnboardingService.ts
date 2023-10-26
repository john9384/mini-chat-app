import { encryptString } from "../../../library/helpers/bcrypt"
import { BadRequestError } from "../../../library/helpers/error"
import { IUserRepository } from "../../../types/user"

export class OnboardingService {
  constructor(private userRepository: IUserRepository) {}
  public async signup(payload: any) {
    const existingUser = await this.userRepository.findOne({
      email: payload.email,
    })

    if (existingUser) throw new BadRequestError("User exists")

    const hashedPassword = await encryptString(payload.password)
    const newUser = await this.userRepository.create({
      ...payload,
      password: hashedPassword,
    })

    return newUser
  }
}
