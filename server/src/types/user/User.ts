import { Read, Write } from "../../databases/mongodb/interface"

export interface IUser {
  id: string
  firstname: string
  lastname: string
  avatar: string
  email: string
  password: string
}

export interface IUserRepository extends Read<IUser>, Write<IUser> {}
