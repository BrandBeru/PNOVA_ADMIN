import mongoose, { Schema } from "mongoose";

const ORDER_DOCUMENT = "orders";

const OrderSchema = new Schema<IOrder>({
  clientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "services" },
  deliverDate: { type: String, default: new Date() },
  additionalInformation: { type: String },
  reviews: {type: mongoose.Schema.Types.Number, required: true},
  priority: {type: mongoose.Schema.Types.Boolean},
  meta:{
    createdDate: {type: mongoose.Schema.Types.Date, default: new Date()},
    modifiedDate: {type: mongoose.Schema.Types.Date, default: new Date()},
    payment: {type: mongoose.Schema.Types.Boolean, default: false},
    delivered: {type: mongoose.Schema.Types.Boolean, default: false},
    active: {type: mongoose.Schema.Types.Boolean, default: false}
  }
});
const Order = mongoose.model(ORDER_DOCUMENT, OrderSchema)
export {ORDER_DOCUMENT, OrderSchema, Order}
