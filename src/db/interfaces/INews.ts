import mongoose from "mongoose"

export default interface INews{
  title: String,
  image: String
  by: String,
  likes: [mongoose.Schema.Types.ObjectId],
  paragraphs: [String],
  pictures: [String],
  meta: {
    createdDate: Date,
    modifiedDate: Date,
  }
}
