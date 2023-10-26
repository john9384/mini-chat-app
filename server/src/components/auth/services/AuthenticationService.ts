import { compareHash } from "../../../library/helpers/bcrypt"
import { BadRequestError } from "../../../library/helpers/error"
import { JWT } from "../../../library/helpers/jwt"
import { IUserRepository } from "../../../types/user"

export class AuthenticationService {
  constructor(private userRepository: IUserRepository) {}

  public async login(payload: any) {
    const existingUser = await this.userRepository.findOne({
      email: payload.email,
    })

    if (!existingUser) throw new BadRequestError("Not a user, signup")

    const passwordValid = await compareHash(
      payload.password,
      existingUser.password
    )

    if (!passwordValid) throw new BadRequestError("Invalid credentials")

    const token = JWT.encrypt({
      id: existingUser.id,
      email: existingUser.email,
    })

    return { email: payload.email, token }
  }
}
