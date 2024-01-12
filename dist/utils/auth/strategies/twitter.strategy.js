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
const config_1 = __importDefault(require("../../../config/config"));
const boom_1 = __importDefault(require("@hapi/boom"));
const passport_twitter_1 = __importDefault(require("passport-twitter"));
const TwitterStrategy = passport_twitter_1.default.Strategy;
const options = {
    consumerKey: config_1.default.tConsumerKey,
    consumerSecret: config_1.default.tConsumerSecret,
    callbackURL: config_1.default.tCallbackUrl
};
const verifyHandler = (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const password = yield fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json());
        ''.toLowerCase;
        const data = {
            name: profile.displayName.split(" ")[0],
            lastName: profile.displayName.split(" ")[1],
            username: profile.username.toLowerCase(),
            email: profile.id,
            password: password,
            provider: profile.provider
        };
        return cb(null, data);
    }
    catch (error) {
        throw boom_1.default.conflict(error);
    }
});
const TwitterOAuth = new TwitterStrategy(options, verifyHandler);
exports.default = TwitterOAuth;
