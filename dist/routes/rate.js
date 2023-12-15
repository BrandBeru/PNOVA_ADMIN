"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rate_service_1 = __importDefault(require("../services/rate.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const rate_schema_1 = require("../schemas/rate.schema");
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const service = new rate_service_1.default();
const router = (0, express_1.Router)();
router.post("/", (0, validator_handler_1.default)(rate_schema_1.createRateSchema, "body"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client"), (req, res, next) => {
    try {
        const body = req.body;
        const rta = service.create(body);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
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
router.get("/:level", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), (req, res, next) => {
    try {
        const skip = req.params.skip;
        const limit = req.params.limit;
        const ascend = req.params.asc;
        const { level } = req.params;
        const rta = service.findByRate(level, ascend, skip, limit);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.get("/user", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client"), (req, res, next) => {
    try {
        const id = req.user.sub;
        const rta = service.findByUserId(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.get("/user/:id", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("admin"), (req, res, next) => {
    try {
        const id = req.user.sub;
        const rta = service.findByUserId(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.get("/service/:id", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), (req, res, next) => {
    const { id } = req.params;
    const rta = service.findByServiceId(id);
    res.json(rta);
});
exports.default = router;
