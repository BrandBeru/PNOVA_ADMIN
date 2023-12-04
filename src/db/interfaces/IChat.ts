interface IChat{
  members: [],
  messages: Array<IMessage>
  meta: {
    createdDate: String,
    modifiedDate: String,
    isBlocked: Boolean,
  }
}
