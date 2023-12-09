"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const auth_1 = __importDefault(require("./auth"));
const chat_1 = __importDefault(require("./chat"));
const group_1 = __importDefault(require("./group"));
const service_1 = __importDefault(require("./service"));
const rate_1 = __importDefault(require("./rate"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/auth', auth_1.default);
    router.use('/users', users_1.default);
    router.use('/chats', chat_1.default);
    router.use('/groups', group_1.default);
    router.use('/services', service_1.default);
    router.use('/rates', rate_1.default);
}
exports.default = routerApi;
