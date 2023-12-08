interface IService{
  name: String,
  faviconUrl: String,
  description: String,
  price: Number,
  deliverTime: Number,
  imagesUrl: [String],
  meta: {
    createdDate: String,
    modifiedDate: String,
    isActive: Boolean
  }
}
