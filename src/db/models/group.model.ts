import mongoose, { Schema } from "mongoose";

const GROUP_DOCUMENT = "group";

const GroupSchema = new Schema<IGroup>({
  chatId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      unique: true
    }],
    required: true
  }
});

const Group = mongoose.model(GROUP_DOCUMENT, GroupSchema)

export {GroupSchema, GROUP_DOCUMENT, Group}
