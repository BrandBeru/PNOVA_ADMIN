import Joi from "joi";

const email = Joi.string().min(3)
const password = Joi.string().min(6)

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})

export {loginUserSchema}
