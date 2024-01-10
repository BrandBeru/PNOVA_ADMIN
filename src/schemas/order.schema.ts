import Joi from "joi";

const id = Joi.string().min(5)
const serviceId = Joi.string().min(5)
const additionalInformation = Joi.string()
const reviews = Joi.number()
const priority = Joi.boolean()

const createOrderSchema = Joi.object({
  serviceId: serviceId.required(),
  additionalInformation: additionalInformation,
  reviews: reviews,
  priority: priority
})
const updateOrderSchema = Joi.object({
  additionalInformation: additionalInformation.required(),
  reviews: reviews.required(),
  priority: priority.required()
})
const findOrderSchema = Joi.object({
  id: id.required()
})

export {createOrderSchema, findOrderSchema, updateOrderSchema}
