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
const channel_1 = __importDefault(require("./channel"));
const config_1 = __importDefault(require("../config/config"));
function routerApi(app, server, session) {
    const router = express_1.default.Router();
    app.use(`/${config_1.default.project}/${config_1.default.version}`, router);
    router.use('/auth', auth_1.default);
    router.use('/users', users_1.default);
    router.use('/chats', (0, chat_1.default)(server, session));
    router.use('/groups', group_1.default);
    router.use('/services', service_1.default);
    router.use('/rates', rate_1.default);
    router.use('/channels', channel_1.default);
}
exports.default = routerApi;
