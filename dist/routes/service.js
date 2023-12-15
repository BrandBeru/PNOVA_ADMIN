"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_service_1 = __importDefault(require("../services/service.service"));
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const services_schema_1 = require("../schemas/services.schema");
const service = new service_service_1.default();
const router = (0, express_1.Router)();
router.get("/", passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("admin"), (req, res, next) => {
    try {
        const services = service.find();
        res.json(services);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", (0, validator_handler_1.default)(services_schema_1.createServiceSchema, "body"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("admin"), (req, res, next) => {
    try {
        const body = req.body;
        const rta = service.create(body);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
});
router.get("/:id", (0, validator_handler_1.default)(services_schema_1.findServiceSchema, "params"), (req, res, next) => {
    try {
        const { id } = req.params;
        const rta = service.findById(id);
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
exports.default = router;
