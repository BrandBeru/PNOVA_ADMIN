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
exports.Order = exports.OrderSchema = exports.ORDER_DOCUMENT = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ORDER_DOCUMENT = "orders";
exports.ORDER_DOCUMENT = ORDER_DOCUMENT;
const OrderSchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "users" },
    serviceId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: "services" },
    deliverDate: { type: String, default: new Date() },
    aditionalInformation: { type: String },
    reviews: { type: mongoose_1.default.Schema.Types.Number, required: true },
    priority: { type: mongoose_1.default.Schema.Types.Boolean },
    meta: {
        createdDate: { type: mongoose_1.default.Schema.Types.Date, default: new Date() },
        modifiedDate: { type: mongoose_1.default.Schema.Types.Date, default: new Date() },
        payment: { type: mongoose_1.default.Schema.Types.Boolean, default: false },
        delivered: { type: mongoose_1.default.Schema.Types.Boolean, default: false }
    }
});
exports.OrderSchema = OrderSchema;
const Order = mongoose_1.default.model(ORDER_DOCUMENT, OrderSchema);
exports.Order = Order;
