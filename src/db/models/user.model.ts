import mongoose, { Schema } from "mongoose"

const USER_DOCUMENT = 'users'

const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  recoveryToken: {
    type: String,
    default: '',
  },
  provider: {
    type: String,
    default: 'pnova'
  },
  profilePicture: {
    type: String
  },
  lastLoginDate: {
    type: Date,
    default: Date.now()
  },
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
      default: false
    }
  }
})

const User = mongoose.models['users'] || mongoose.model(USER_DOCUMENT, UserSchema)

export {USER_DOCUMENT, UserSchema, User}
