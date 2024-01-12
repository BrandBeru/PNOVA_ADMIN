interface INews{
  title: String,
  image: String
  by: String,
  likes: [String],
  paragraphs: [String],
  pictures: [String],
  meta: {
    createdDate: Date,
    modifiedDate: Date,
  }
}
