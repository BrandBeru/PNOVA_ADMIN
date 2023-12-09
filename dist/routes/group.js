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
const group_service_1 = __importDefault(require("../services/group.service"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const group_schema_1 = require("../schemas/group.schema");
const router = (0, express_1.Router)();
const service = new group_service_1.default();
router.post("/", (0, validator_handler_1.default)(group_schema_1.createGroupSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const userId = req.user.sub;
        const group = yield service.create(body, userId);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
