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
const new_model_1 = require("../db/models/new.model");
class NewService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield new_model_1.New.create(body);
            return rta;
        });
    }
    like(newId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const liked = yield new_model_1.New.findOne({ _id: newId, likes: { $in: [id] } });
            if (liked)
                return { message: 'Already liked', liked: true };
            const rta = yield new_model_1.New.updateOne({ _id: newId }, { $push: { likes: id } });
            return rta;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield new_model_1.New.find({});
            return news;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield new_model_1.New.findOne({ _id: id }).populate({ path: 'likes', select: 'name lastName username meta' });
            return rta;
        });
    }
    updateOne(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield new_model_1.New.updateOne({ _id: id }, params);
            return rta;
        });
    }
}
exports.default = NewService;
