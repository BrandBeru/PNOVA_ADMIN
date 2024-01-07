import mongoose, { Schema } from "mongoose"

const SERVICE_DOCUMENT = 'services'

const ServiceSchema = new Schema<IService>({
  name: {type: String, required: true},
  faviconUrl: {type: String},
  description: {type: String},
  price: {type: Number, required: true},
  deliverTime: {type: Number, required: true},
  imagesUrl: [{type: String}],
  characteristics: [{type: {}, required: true}],
  meta: {
    createdDate: {type: String, default: new Date()},
    modifiedDate: {type: String, default: new Date()},
    isActive: {type: Boolean, default: true}
  }
})

const Service = mongoose.model(SERVICE_DOCUMENT, ServiceSchema)

export {ServiceSchema, SERVICE_DOCUMENT, Service}
