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
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const new_service_1 = __importDefault(require("../services/new.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const new_schema_1 = require("../schemas/new.schema");
const router = (0, express_1.Router)();
const service = new new_service_1.default();
router.post('/', (0, validator_handler_1.default)(new_schema_1.createNewSchema, 'body'), passport_1.default.authenticate('jwt'), (0, auth_handler_1.checkRoles)('admin'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const rta = yield service.create(body);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/like/:id', (0, validator_handler_1.default)(new_schema_1.findOneNewSchema, 'params'), passport_1.default.authenticate('jwt'), (0, auth_handler_1.checkRoles)('client', 'user'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.user.sub;
        const { id } = req.params;
        const rta = yield service.like(newId, id);
        res.json(rta);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rta = yield service.findAll();
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (0, validator_handler_1.default)(new_schema_1.findOneNewSchema, 'params'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.findOne(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/:id', (0, validator_handler_1.default)(new_schema_1.findOneNewSchema, 'params'), passport_1.default.authenticate('jwt'), (0, auth_handler_1.checkRoles)('admin'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.findOne(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
