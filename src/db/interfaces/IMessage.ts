interface IMessage {
  parentMessageId: String
  transmitter: String,
  text: String;
  iv: String,
  meta: {
    received: Boolean;
    seen: Boolean;
    createdDate: String;
    modifiedDate:String
  };
}
