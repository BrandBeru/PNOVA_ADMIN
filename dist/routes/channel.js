"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const channel_service_1 = __importDefault(require("../services/channel.service"));
const service = new channel_service_1.default();
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    try {
        const channels = service.find();
        res.json(channels);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', (req, res, next) => {
    try {
        const body = req.body;
        const channel = service.create(body);
        res.json(channel);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
