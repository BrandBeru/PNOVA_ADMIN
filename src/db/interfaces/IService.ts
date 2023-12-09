interface IService{
  name: String,
  faviconUrl: String,
  description: String,
  price: Number,
  deliverTime: Number,
  imagesUrl: [],
  meta: {
    createdDate: String,
    modifiedDate: String,
    isActive: Boolean
  }
}
