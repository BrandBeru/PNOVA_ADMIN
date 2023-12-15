"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../db/models/order.model");
class OrderService {
    create(body) {
        const order = order_model_1.Order.create(body);
        return order;
    }
    find(skip, limit) {
        const orders = order_model_1.Order.find({})
            .skip(skip)
            .limit(limit);
        return orders;
    }
    findOne(id) {
        const orders = order_model_1.Order.findOne({ _id: id });
        return orders;
    }
    updateById(id) {
        const rta = order_model_1.Order.updateOne({ _id: id });
        return rta;
    }
}
exports.default = OrderService;
