import { IUserRepository } from "../../../types/user"

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async read(query: any) {
    const user = await this.userRepository.findOne(query)

    return user
  }
}
