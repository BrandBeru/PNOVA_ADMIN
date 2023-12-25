import mongoose, { Schema } from "mongoose";

const GROUP_DOCUMENT = "channels";

const GroupSchema = new Schema<IChannel>({
  name: { type: String, required: true },
  description: { type: String },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      unique: true
    }],
    required: true
  },
  meta: {

  }
});

const Group = mongoose.model(GROUP_DOCUMENT, GroupSchema)

export {GroupSchema, GROUP_DOCUMENT, Group}
