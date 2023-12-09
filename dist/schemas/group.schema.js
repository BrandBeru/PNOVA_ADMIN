"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupSchema = exports.createGroupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const chatId = joi_1.default.string();
const name = joi_1.default.string().min(3).max(60);
const description = joi_1.default.string().min(3).max(200);
const id = joi_1.default.string();
const pictureUrl = joi_1.default.string().uri();
const createGroupSchema = joi_1.default.object({
    name: name.required(),
    chatId: chatId.required(),
    description,
});
exports.createGroupSchema = createGroupSchema;
const getGroupSchema = joi_1.default.object({
    id: id.required()
});
exports.getGroupSchema = getGroupSchema;
