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
const passport_linkedin_oauth2_1 = __importDefault(require("passport-linkedin-oauth2"));
const LinkedinStrategy = passport_linkedin_oauth2_1.default.Strategy;
const options = {
    clientID: config_1.default.lClientID,
    clientSecret: config_1.default.lClientSecret,
    callbackURL: config_1.default.lCallbackUrl,
    scope: ['email', 'profile'],
    state: true
};
const verifyHandler = (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ahh");
    process.nextTick(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const password = yield fetch('https://passwordinator.onrender.com?num=true&char=true&caps=true&len=32').then(data => data.json());
            ''.toLowerCase;
            console.log(profile);
            const data = {
                name: profile.displayName.split(" ")[0],
                lastName: profile.displayName.split(" ")[1],
                username: profile.username.toLowerCase(),
                email: profile.id,
                password: password,
                provider: profile.provider
            };
            return done(null, profile);
        }
        catch (error) {
            throw boom_1.default.conflict(error);
        }
    }));
});
const LinkedinOAuth = new LinkedinStrategy(options, verifyHandler);
exports.default = LinkedinOAuth;
