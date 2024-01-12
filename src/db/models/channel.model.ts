import mongoose, { Schema } from "mongoose";

const GROUP_DOCUMENT = "channels";

const GroupSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  description: { type: String },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: 'users'
    }],
    required: true
  },
  meta: {
    createdDate: {type: Date, default: new Date()},
    modifiedDate: {type: Date, default: new Date()},
    isActive: {type: Boolean, default: true}
  }
});

const Group = mongoose.model(GROUP_DOCUMENT, GroupSchema)

export {GroupSchema, GROUP_DOCUMENT, Group}
