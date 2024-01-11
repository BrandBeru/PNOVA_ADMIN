import Joi from "joi";

const id = Joi.string().min(5)
const serviceId = Joi.string().min(5)
const additionalInformation = Joi.string()
const reviews = Joi.number()
const priority = Joi.boolean()

const createOrderSchema = Joi.object({
  serviceId: serviceId.required(),
  additionalInformation: additionalInformation.required(),
  priority: priority
})
const findOrderSchema = Joi.object({
  id: id.required()
})

export {createOrderSchema, findOrderSchema}
