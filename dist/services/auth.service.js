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
const boom_1 = __importDefault(require("@hapi/boom"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = __importDefault(require("./user.service"));
const config_1 = __importDefault(require("../config/config"));
const service = new user_service_1.default();
class AuthService {
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield service.findByEmail(email);
            if (!user) {
                throw boom_1.default.notFound();
            }
            const compare = yield bcrypt_1.default.compare(password, user.password);
            if (!compare) {
                throw boom_1.default.unauthorized();
            }
            return user;
        });
    }
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user._id,
                scope: user.role
            };
            const secret = config_1.default.jwtSecret || '';
            const token = jsonwebtoken_1.default.sign(payload, secret);
            return token;
        });
    }
}
exports.default = AuthService;
