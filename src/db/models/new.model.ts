import mongoose from "mongoose"

const NEW_DOCUMENT = 'news'

const NewSchema = new mongoose.Schema<INews>({
  title: {type: String, required: true},
  image: {type: String, required: true},
  by: {type: String, required: true, default: 'PNOVA STUDIIOS'},
  likes: {type: [{type: mongoose.Schema.Types.ObjectId, unique: true, ref: 'users'}], required: true},
  paragraphs: {type: [String], required: true},
  pictures: {type: [String], required: true},
  meta: {
    createdDate: {type: Date, default: new Date()},
    modifiedDate: {type: Date, default: new Date()},
  }
})

const New = mongoose.model(NEW_DOCUMENT, NewSchema)

export {NEW_DOCUMENT, NewSchema, New}
