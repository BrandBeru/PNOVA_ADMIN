"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_service_1 = __importDefault(require("../services/order.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const order_schema_1 = require("../schemas/order.schema");
const router = (0, express_1.Router)();
const service = new order_service_1.default();
router.get("/", (req, res, next) => {
    try {
        const skip = req.params.skip;
        const limit = req.params.limit;
        const rta = service.find(skip, limit);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.get("/:id", (0, validator_handler_1.default)(order_schema_1.findOrderSchema, "params"), (req, res, next) => {
    try {
        const { id } = req.params;
        const rta = service.findOne(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", (0, validator_handler_1.default)(order_schema_1.createOrderSchema, "body"), (req, res, next) => {
    try {
        const body = req.body;
        const rta = service.create(body);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.patch("/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        const rta = service.updateById(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
