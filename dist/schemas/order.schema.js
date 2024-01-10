"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.findOrderSchema = exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().min(5);
const serviceId = joi_1.default.string().min(5);
const additionalInformation = joi_1.default.string();
const reviews = joi_1.default.number();
const priority = joi_1.default.boolean();
const createOrderSchema = joi_1.default.object({
    serviceId: serviceId.required(),
    additionalInformation: additionalInformation,
    reviews: reviews,
    priority: priority
});
exports.createOrderSchema = createOrderSchema;
const updateOrderSchema = joi_1.default.object({
    additionalInformation: additionalInformation.required(),
    reviews: reviews.required(),
    priority: priority.required()
});
exports.updateOrderSchema = updateOrderSchema;
const findOrderSchema = joi_1.default.object({
    id: id.required()
});
exports.findOrderSchema = findOrderSchema;
