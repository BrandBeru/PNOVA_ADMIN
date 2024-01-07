import Joi from "joi";

const id = Joi.string().min(3).max(30)
const name = Joi.string().min(3).max(20)
const faviconUrl = Joi.string().uri()
const description = Joi.string().max(200)
const price = Joi.number()
const deliverTime = Joi.number()
const imagesUrl = Joi.array()
const characteristics = Joi.array()

const createServiceSchema = Joi.object({
  name: name.required(),
  faviconUrl: faviconUrl.required(),
  description: description,
  price: price.required(),
  deliverTime: deliverTime.required(),
  imagesUrl: imagesUrl,
  characteristics: characteristics.required()
})
const findServiceSchema = Joi.object({
  _id: id.required()
})

export {createServiceSchema, findServiceSchema}
