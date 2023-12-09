"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.getChatSchema = exports.createChatSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string();
const member = joi_1.default.string().min(3).max(150);
const parentMessageId = joi_1.default.string();
const transmitter = joi_1.default.string();
const text = joi_1.default.string().max(500);
const createChatSchema = joi_1.default.object({
    member: member.required()
});
exports.createChatSchema = createChatSchema;
const sendMessage = joi_1.default.object({
    parentMessageId: parentMessageId,
    text: text.required()
});
exports.sendMessage = sendMessage;
const getChatSchema = joi_1.default.object({
    id: id.required()
});
exports.getChatSchema = getChatSchema;
