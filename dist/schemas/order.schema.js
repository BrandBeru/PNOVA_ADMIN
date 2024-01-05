"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().min(5);
const serviceId = joi_1.default.string().min(5);
const aditionalInformation = joi_1.default.string();
const reviews = joi_1.default.number();
const priority = joi_1.default.boolean();
const createOrderSchema = joi_1.default.object({
    serviceId: serviceId.required(),
    aditionalInformation: aditionalInformation,
    reviews: reviews,
    priority: priority
});
exports.createOrderSchema = createOrderSchema;
const findOrderSchema = joi_1.default.object({
    id: id.required()
});
exports.findOrderSchema = findOrderSchema;
