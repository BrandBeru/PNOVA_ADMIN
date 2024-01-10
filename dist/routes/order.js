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
const express_1 = require("express");
const order_service_1 = __importDefault(require("../services/order.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const order_schema_1 = require("../schemas/order.schema");
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const router = (0, express_1.Router)();
const service = new order_service_1.default();
router.get("/", passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client", 'admin'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = req.params.skip;
        const limit = req.params.limit;
        const clientId = req.user.sub;
        const rta = yield service.find(skip, limit, clientId);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client", "admin"), (0, validator_handler_1.default)(order_schema_1.findOrderSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.findOne(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(order_schema_1.createOrderSchema, "body"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("user"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const clientId = req.user.sub;
        const data = Object.assign(Object.assign({}, body), { clientId: clientId });
        const rta = yield service.create(data);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(order_schema_1.updateOrderSchema, "body"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("admin", "client"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const rta = yield service.updateById(id, body);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
