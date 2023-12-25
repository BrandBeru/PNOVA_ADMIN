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
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const config_1 = __importDefault(require("../../../config/config"));
const boom_1 = __importDefault(require("@hapi/boom"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const options = {
    clientID: config_1.default.clientId,
    clientSecret: config_1.default.clientSecret,
    callbackURL: config_1.default.callbackUrl,
};
const verifyHandler = (accessToken, refreshToken, profile, cb, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = yield fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json());
        const data = {
            name: cb.name.givenName,
            lastName: cb.name.familyName,
            username: `user${cb.id}`,
            email: cb.emails[0].value,
            password: password,
        };
        return done(null, data);
    }
    catch (error) {
        throw boom_1.default.conflict(error);
    }
});
const GoogleOAuth = new GoogleStrategy(options, verifyHandler);
exports.default = GoogleOAuth;
