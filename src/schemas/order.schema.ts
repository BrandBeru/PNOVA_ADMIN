import Joi from "joi";

const id = Joi.string().min(5)
const clientId = Joi.string().min(5)
const serviceId = Joi.string().min(5)
const aditionalInformation = Joi.string()
const reviews = Joi.number()
const priority = Joi.boolean()

const createOrderSchema = Joi.object({
  clientId: clientId.required(),
  serviceId: serviceId.required(),
  aditionalInformation: aditionalInformation,
  reviews: reviews,
  priority: priority
})
const findOrderSchema = Joi.object({
  id: id.required()
})

export {createOrderSchema, findOrderSchema}
