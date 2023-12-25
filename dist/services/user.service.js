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
const user_model_1 = require("../db/models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const boom_1 = __importDefault(require("@hapi/boom"));
class UserService {
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.find({
                name: { $regex: name, $options: "i" }
            }).select({ name: 1, lastName: 1, email: 1 });
            if (!users.length) {
                throw boom_1.default.notFound();
            }
            return users;
        });
    }
    findbyUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ username: username }).select({
                name: 1, lastName: 1, email: 1, username: 1, _id: 0
            });
            if (!user) {
                throw boom_1.default.notFound();
            }
            return user;
        });
    }
    getUsernameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ _id: id }, { username: 1, _id: 0 });
            return user.username;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email: email });
            return user;
        });
    }
    getUserById(...ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.find({ _id: { $in: [...ids] } });
            return users;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(user.password.toString(), 10);
            const rta = yield user_model_1.User.create(Object.assign(Object.assign({}, user), { password: hash }));
            return rta;
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = Object.assign(Object.assign({}, data), { meta: {
                    modified_date: new Date()
                } });
            const rta = yield user_model_1.User.updateOne({ username: id }, updated);
            return rta;
        });
    }
    existUsers(...users) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.find({ _id: { $in: users } });
        });
    }
    existUsersByEmail(...users) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.find({ email: { $in: users } });
        });
    }
}
exports.default = UserService;
