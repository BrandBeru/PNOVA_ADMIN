import Joi from "joi";

const email = Joi.string().min(3)
const password = Joi.string().min(6).max(200)
const subject = Joi.string().min(5).max(50)
const to = Joi.string().min(3).max(10)

const greeting = Joi.string().min(5)
const info = Joi.string().min(5)
const farewell = Joi.string().min(5)
const clientEmail = Joi.string().min(5)
const paragraphs = Joi.array()

const url = Joi.string().uri()
const text = Joi.string().min(3)
const button = Joi.object({
  url: url.required(),
  text: text.required()
})

const html = Joi.object({
  greeting: greeting.required(),
    info: info.required(),
    button: button.required(),
    farewell: farewell.required(),
    clientEmail: clientEmail.required(),
    paragraph: paragraphs.required()
})

const loginUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
})
const sendEmailSchema = Joi.object({
  subject: subject.required(),
  to: to.required(),
  html: html.required()
})

export {loginUserSchema, sendEmailSchema}
