"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServiceSchema = exports.createServiceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().min(3).max(30);
const name = joi_1.default.string().min(3).max(20);
const faviconUrl = joi_1.default.string().uri();
const description = joi_1.default.string().max(200);
const price = joi_1.default.number();
const deliverTime = joi_1.default.number();
const imagesUrl = joi_1.default.array();
const createServiceSchema = joi_1.default.object({
    name: name.required(),
    faviconUrl: faviconUrl.required(),
    description: description,
    price: price.required(),
    deliverTime: deliverTime.required(),
    imagesUrl: imagesUrl
});
exports.createServiceSchema = createServiceSchema;
const findServiceSchema = joi_1.default.object({
    _id: id.required()
});
exports.findServiceSchema = findServiceSchema;
