"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../db/models/order.model");
const user_service_1 = __importDefault(require("./user.service"));
const user = new user_service_1.default();
class OrderService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var order = (yield order_model_1.Order.create(body)).populate({
                path: 'clientId',
                select: '_id name lastName username email meta'
            });
            order = (yield order).populate('serviceId');
            yield user.updateRole(body.clientId.toString(), 'client');
            return order;
        });
    }
    find(skip, limit, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.Order.find({ clientId: clientId })
                .skip(skip)
                .limit(limit);
            return orders;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.Order.findOne({ _id: id }).populate('serviceId').populate({
                path: 'clientId',
                select: '_id name lastName username email meta'
            });
            return orders;
        });
    }
    updateById(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            var rta = yield order_model_1.Order.updateOne({ _id: id }, body).populate({
                path: 'clientId',
                select: '_id name lastName username email meta'
            }).populate('serviceId');
            return rta;
        });
    }
}
exports.default = OrderService;
