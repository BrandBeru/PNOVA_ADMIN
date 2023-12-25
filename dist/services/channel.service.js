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
const channel_model_1 = require("../db/models/channel.model");
class ChannelService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = channel_model_1.Group.create(body);
            return channel;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const channels = channel_model_1.Group.find({});
            return channels;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = channel_model_1.Group.findOne({ _id: id });
            return channel;
        });
    }
    updateOne(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = ChannelService;
