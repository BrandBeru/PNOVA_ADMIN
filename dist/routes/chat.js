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
const socket_io_1 = require("socket.io");
const path_1 = require("path");
const service = new chat_service_1.default();
const router = express_1.default.Router();
function chatRouter(server) {
    const io = new socket_io_1.Server(server, {
        connectionStateRecovery: {},
        cors: {
            origin: ['http://localhost:5500']
        }
    });
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        const user = (yield fetch('https://randomuser.me/api/').then(data => data.json()));
        const id = user.results[0].name.first;
        socket.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            const token = socket.handshake.auth.token;
            const chatId = socket.handshake.auth.chatId;
            const user = socket.handshake.auth.user;
            console.log(chatId, user);
            io.emit("message", msg, id);
        }));
    }));
    router.get("/", passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user.sub;
            const data = yield service.findChatByMember(user);
            res.json(data);
        }
        catch (error) {
            next(error);
        }
    }));
    router.get("/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const chat = service.findChatById(id);
            res.sendFile((0, path_1.join)(__dirname, '../index.html'));
        }
        catch (error) {
            next(error);
        }
    }));
    router.get("/members/:id", passport_1.default.authenticate("jwt", { session: true }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    router.post("/", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.createChatSchema, "body"), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    router.post("/message/:chatId", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.sendMessage, "body"), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    router.delete("/:id", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(chat_schema_1.getChatSchema, "params"), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const rta = yield service.deleteChat(id);
            res.json(rta);
        }
        catch (error) {
            next(error);
        }
    }));
    return router;
}
exports.default = chatRouter;
