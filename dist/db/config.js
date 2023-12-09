"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
const config_1 = __importDefault(require("../config/config"));
const USER = encodeURIComponent((_a = config_1.default.dbUser) !== null && _a !== void 0 ? _a : '');
const PASSWORD = encodeURIComponent((_b = config_1.default.dbPassword) !== null && _b !== void 0 ? _b : '');
const URI = `mongodb://${USER}:${PASSWORD}@${config_1.default.dbHost}:${config_1.default.dbPort}/${config_1.default.dbName}`;
const development = {
    uri: URI,
    dialect: 'mongodb'
};
exports.development = development;
