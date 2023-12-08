interface IRate{
  userId: String,
  serviceId: String,
  rate: Number,
  message: String,
  meta: {
    createdDate: String,
    modifiedDate: String,
  }
}
