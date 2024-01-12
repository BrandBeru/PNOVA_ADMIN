import Joi from "joi";

const id = Joi.string().min(5).max(15)
const title = Joi.string().min(3).max(120)
const image = Joi.string().uri()
const by = Joi.string().min(3).max(50)
const paragraphs = Joi.array().min(1).max(6)
const pictures = Joi.array().min(1).max(6)

const createNewSchema = Joi.object({
  title: title.required(),
  image: image.required(),
  by: by.required(),
  paragraphs: paragraphs.required(),
  pictures: pictures.required()
})
const findOneNewSchema = Joi.object({
  id: id.required()
})

export {createNewSchema, findOneNewSchema}
