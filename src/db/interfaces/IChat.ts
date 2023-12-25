interface IChat{
  members: [],
  channelId: String,
  messages: Array<IMessage>
  meta: {
    createdDate: String,
    modifiedDate: String,
    isBlocked: Boolean,
  }
}
