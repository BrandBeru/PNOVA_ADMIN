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
const rate_service_1 = __importDefault(require("../services/rate.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const rate_schema_1 = require("../schemas/rate.schema");
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const service = new rate_service_1.default();
const router = (0, express_1.Router)();
router.post("/", (0, validator_handler_1.default)(rate_schema_1.createRateSchema, "body"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client", "admin"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.sub;
        const body = req.body;
        const rta = yield service.create(Object.assign(Object.assign({}, body), { userId }));
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/testimonials', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = req.query;
        const rta = yield service.findByRating(skip, limit);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = req.params.skip;
        const limit = req.params.limit;
        const rta = yield service.find(skip, limit);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/level/:level", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = req.params.skip;
        const limit = req.params.limit;
        const ascend = req.params.asc;
        const { level } = req.params;
        const rta = yield service.findByRate(level, ascend, skip, limit);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/me", passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("client"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.sub;
        const rta = yield service.findByUserId(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/user/:id", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), passport_1.default.authenticate("jwt"), (0, auth_handler_1.checkRoles)("admin"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.findByUserId(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/service/:id", (0, validator_handler_1.default)(rate_schema_1.findRateByUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.findByServiceId(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
