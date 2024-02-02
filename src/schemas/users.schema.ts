import Joi from "joi";

const name = Joi.string().min(3).max(100)
const lastName = Joi.string().min(3).max(100)
const username = Joi.string().min(5).max(50)
const email = Joi.string().email()
const password = Joi.string().min(6).max(150)
const profilePicture = Joi.string().min(5).max(200)

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  username: username.required(),
  email: email.required(),
  password: password.required(),
})
const updateUserSchema = Joi.object({
  name,
  lastName,
  username,
  profilePicture
})
const getUserSchema = Joi.object({
  username: username.required()
})
const findUserByName = Joi.object({
  name: name.required().min(3)
})
const deleteUserSchema = Joi.object({
  username: username.required()
})

export {createUserSchema, getUserSchema, deleteUserSchema,findUserByName, updateUserSchema}
