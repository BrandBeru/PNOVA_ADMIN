interface IChannel{
  name: String,
  description: String,
  admins: [],
  meta: {
    createdDate: String,
    modifiedDate: String,
    isActive: Boolean
  }
}
