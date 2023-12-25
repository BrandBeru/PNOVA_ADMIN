"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.ChatSchema = exports.CHAT_DOCUMENT = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CHAT_DOCUMENT = "chats";
exports.CHAT_DOCUMENT = CHAT_DOCUMENT;
const ChatSchema = new mongoose_1.Schema({
    members: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            unique: true,
            ref: "users",
            required: true,
        },
    ],
    channelId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'channels', required: true },
    messages: [
        {
            _id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                default: new mongoose_1.default.Types.ObjectId(),
            },
            parentMessageId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "chats.messages",
                required: false,
            },
            transmitter: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "users",
                require: true,
            },
            text: {
                type: String,
                required: true,
            },
            iv: { type: String },
            meta: {
                createdDate: {
                    type: mongoose_1.default.Schema.Types.Date,
                    default: new Date(),
                },
                modifiedDate: {
                    type: mongoose_1.default.Schema.Types.Date,
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
            type: mongoose_1.default.Schema.Types.Date,
            default: new Date(),
        },
        modifiedDate: {
            type: mongoose_1.default.Schema.Types.Date,
            default: new Date(),
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
});
exports.ChatSchema = ChatSchema;
const Chat = mongoose_1.default.model(CHAT_DOCUMENT, ChatSchema);
exports.Chat = Chat;
