interface IMessage {
  parentMessageId: String
  transmitter: String,
  text: String;
  meta: {
    received: Boolean;
    seen: Boolean;
    createdDate: String;
    modifiedDate:String
  };
}
