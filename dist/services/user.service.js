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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const boom_1 = __importDefault(require("@hapi/boom"));
class UserService {
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.find({
                $and: [{ name: { $regex: name, $options: "i" } }, { "meta.isActive": true }]
            }).select({ name: 1, lastName: 1, email: 1 });
            if (!users.length) {
                throw boom_1.default.notFound();
            }
            return users;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ $and: [{ username: username }, { "meta.isActive": true }] }).select({
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
            const user = yield user_model_1.User.findOne({ $and: [{ email: email }, { "meta.isActive": true }] });
            return user;
        });
    }
    findByEmailForVerification(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ $and: [{ email: email }, { "meta.isActive": false }] });
            return user;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ _id: id });
            return user;
        });
    }
    getUserById(...ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.User.find({ _id: { $in: [...ids] } }).select({
                name: 1, lastName: 1, email: 1, username: 1, meta: 1
            });
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ _id: id }, { username: 1, name: 1, lastName: 1, email: 1, role: 1, meta: 1, lastLoginDate: 1, profilePicture: 1, provider: 1 });
            return user;
        });
    }
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield user_model_1.User.find({ $and: [{ role: 'client' }, { "meta.isActive": true }] });
            return clients;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profilePicture = `https://ui-avatars.com/api/?name=${user.name}+${user.lastName}&size=128&background=fff&color=bd9272`;
            const hash = yield bcryptjs_1.default.hash(user.password.toString(), 10);
            const rta = yield user_model_1.User.create(Object.assign(Object.assign({}, user), { profilePicture, password: hash }));
            return rta;
        });
    }
    updateOne(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield user_model_1.User.updateOne({ _id: id }, Object.assign({ $set: { "meta.modifiedDate": new Date() } }, data));
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
            return yield user_model_1.User.exists({ email: { $in: users } });
        });
    }
    updateActive(userId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.updateOne({ _id: userId }, { $set: { "meta.isActive": active } });
        });
    }
    updateRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.User.updateOne({ _id: userId }, { $set: { role: role } });
        });
    }
}
exports.default = UserService;
