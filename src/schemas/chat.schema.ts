import Joi from "joi";

const id = Joi.string()
const member = Joi.string().min(3).max(150)
const parentMessageId = Joi.string()
const transmitter = Joi.string()
const text = Joi.string().max(500)

const createChatSchema = Joi.object({
  member: member.required()
})
const sendMessage = Joi.object({
  parentMessageId: parentMessageId,
  text: text.required()
})
const getChatSchema = Joi.object({
  id: id.required()
})

export {createChatSchema, getChatSchema, sendMessage}
