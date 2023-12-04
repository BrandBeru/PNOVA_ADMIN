import Joi from "joi";

const chatId = Joi.string()
const name = Joi.string().min(3).max(60)
const description = Joi.string().min(3).max(200)
const id = Joi.string()
const pictureUrl = Joi.string().uri()

const createGroupSchema = Joi.object({
  name: name.required(),
  chatId: chatId.required(),
  description,
})
const getGroupSchema = Joi.object({
  id: id.required()
})

export {createGroupSchema, getGroupSchema}
