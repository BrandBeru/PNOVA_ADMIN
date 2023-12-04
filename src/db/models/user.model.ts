import mongoose, { Schema } from "mongoose"

const USER_DOCUMENT = 'users'

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    unique: true
  },
  name: String,
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  meta: {
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    modifiedDate: {
      type: Date,
      default: Date.now(),
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
})

const User = mongoose.model(USER_DOCUMENT, UserSchema)

export {USER_DOCUMENT, UserSchema, User}
