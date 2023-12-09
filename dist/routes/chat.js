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
const passport_1 = __importDefault(require("passport"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const chat_schema_1 = require("../schemas/chat.schema");
const chat_service_1 = __importDefault(require("../services/chat.service"));
const express_1 = __importDefault(require("express"));
const service = new chat_service_1.default();
const router = express_1.default.Router();
router.get("/", passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.sub;
        const data = yield service.findChatByMember(user);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/members/:id", passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.sub;
        const members = yield service.getMemberContact(id, userId);
        res.json(members);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.createChatSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { member } = req.body;
        const user = req.user.sub;
        const rta = yield service.create(member, user);
        res.status(201).json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/message/:chatId", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.sendMessage, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId } = req.params;
        const userId = req.user.sub;
        const body = req.body;
        const rta = yield service.sendMessage(chatId, userId, body);
        res.status(201).json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.getChatSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const rta = yield service.deleteChat(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
