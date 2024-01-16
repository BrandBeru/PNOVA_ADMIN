"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneNewSchema = exports.createNewSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().min(5);
const title = joi_1.default.string().min(3).max(120);
const image = joi_1.default.string().uri();
const by = joi_1.default.string().min(3).max(50);
const paragraphs = joi_1.default.array().min(1).max(6);
const pictures = joi_1.default.array().min(1).max(6);
const createNewSchema = joi_1.default.object({
    title: title.required(),
    image: image.required(),
    by: by.required(),
    paragraphs: paragraphs.required(),
    pictures: pictures.required()
});
exports.createNewSchema = createNewSchema;
const findOneNewSchema = joi_1.default.object({
    id: id.required()
});
exports.findOneNewSchema = findOneNewSchema;
