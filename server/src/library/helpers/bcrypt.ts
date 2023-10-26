import bcrypt from "bcrypt"

export const encryptString = async (text: string) => bcrypt.hash(text, 10)

export const compareHash = (text: string, hash: string) =>
  bcrypt.compare(text, hash)
