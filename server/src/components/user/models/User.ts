import { model, Schema } from "mongoose"
import { IUser } from "../../../types/user"

export const DOCUMENT_NAME = "User"
export const COLLECTION_NAME = "users"

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      trim: true,
      minLength: 1,
      maxlength: 60,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      minLength: 1,
      maxlength: 60,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const User = model<IUser>(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
