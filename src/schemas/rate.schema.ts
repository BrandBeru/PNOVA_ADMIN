import Joi from "joi";

const userId = Joi.string().min(5)
const serviceId = Joi.string().min(5)
const rate = Joi.number().min(1).max(5)
const message = Joi.string().max(200)

const createRateSchema = Joi.object({
  serviceId: serviceId,
  rate: rate.required(),
  message: message
})
const findRateByUserSchema = Joi.object({
  id: userId.required()
})

export {createRateSchema, findRateByUserSchema}
