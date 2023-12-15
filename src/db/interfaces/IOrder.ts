interface IOrder{
  clientId: String,
  serviceId: String,
  deliverDate: String,
  aditionalInformation: String,
  reviews: Number,
  priority: Boolean,
  meta: {
    createdDate: String,
    modifiedDate: String,
    payment: Boolean,
    delivered: Boolean
  }
}
