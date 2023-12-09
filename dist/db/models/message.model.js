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
exports.Message = exports.MessageSchema = exports.MESSAGE_DOCUMENT = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MESSAGE_DOCUMENT = 'message';
exports.MESSAGE_DOCUMENT = MESSAGE_DOCUMENT;
const MessageSchema = new mongoose_1.Schema({
    subject: {
        type: String
    },
    creatorId: {
        type: String,
        field: 'creator_id'
    },
    messageBody: {
        type: String,
        field: 'message_body'
    },
    parentMessageId: {
        type: String,
        field: 'parent_message_id'
    },
    isReminder: {
        type: Boolean,
        field: 'is_reminder'
    },
    nextRemindDate: {
        type: Date,
        field: 'next_remind_date'
    },
    meta: {
        createdDate: {
            type: Date,
            default: Date.now(),
            field: 'created_date'
        },
        modifiedDate: {
            type: Date,
            default: Date.now(),
            field: 'modified_date'
        }
    }
});
exports.MessageSchema = MessageSchema;
const Message = mongoose_1.default.model(MESSAGE_DOCUMENT, MessageSchema);
exports.Message = Message;
