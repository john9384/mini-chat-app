import { BaseRepository } from "../../../databases/mongodb/repository/baseRepository"
import { IUser, IUserRepository } from "../../../types/user"
import { User } from "../models"

export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(User)
  }
}
