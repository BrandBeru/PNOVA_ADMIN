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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const config_1 = require("../db/config");
const mongoose = require('mongoose');
// const USER = encodeURIComponent(config.dbUser ?? '')
// const PASSWORD = encodeURIComponent(config.dbPassword ?? '')
// const URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authMechanism=DEFAULT`
var db = null;
exports.db = db;
function mongoConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(config_1.development.uri);
    });
}
exports.default = mongoConnection;
