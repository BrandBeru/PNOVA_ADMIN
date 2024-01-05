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
const channel_service_1 = __importDefault(require("../services/channel.service"));
const passport_1 = __importDefault(require("passport"));
const service = new channel_service_1.default();
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield service.find();
        res.json(channels);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const channel = yield service.create(body);
        res.json(channel);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
