import { ref } from "joi";
import mongoose, { Schema } from "mongoose";

const CHAT_DOCUMENT = "chats";

const ChatSchema: Schema<IChat> = new Schema<IChat>({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "users",
      required: true,
    },
  ],
  messages: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
      parentMessageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chats.messages",
        required: false,
      },
      transmitter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
      },
      text: {
        type: String,
        required: true,
      },
      meta: {
        createdDate: {
          type: mongoose.Schema.Types.Date,
          default: new Date(),
        },
        modifiedDate: {
          type: mongoose.Schema.Types.Date,
          default: new Date(),
        },
        received: {
          type: Boolean,
          default: false,
        },
        seen: {
          type: Boolean,
          default: false,
        },
      },
    },
  ],
  meta: {
    createdDate: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },
    modifiedDate: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
});

const Chat = mongoose.model(CHAT_DOCUMENT, ChatSchema);

export { CHAT_DOCUMENT, ChatSchema, Chat };
