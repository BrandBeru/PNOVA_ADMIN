"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRateByUserSchema = exports.createRateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userId = joi_1.default.string().min(5);
const serviceId = joi_1.default.string().min(5);
const rate = joi_1.default.number().min(1).max(5);
const message = joi_1.default.string().max(200);
const createRateSchema = joi_1.default.object({
    serviceId: serviceId.required(),
    rate: rate.required(),
    message: message
});
exports.createRateSchema = createRateSchema;
const findRateByUserSchema = joi_1.default.object({
    id: userId.required()
});
exports.findRateByUserSchema = findRateByUserSchema;
