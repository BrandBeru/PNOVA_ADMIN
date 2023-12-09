"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_oauth2_1 = __importDefault(require("passport-oauth2"));
const options = {
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth/',
    tokenURL: 'https://oauth2.example.com/callback#access_token=4/P7q7W91&token_type=Bearer&expires_in=3600',
    clientID: '988821143071-h765n0ffhvndm52p7ofgkkp0e44puu4e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3030/',
    scope: 'https://accounts.google.com/o/oauth2/v2/auth/userinfo.profile'
};
const OAuth2 = new passport_oauth2_1.default(options, (payload, done) => {
    return done(null, payload);
});
exports.default = OAuth2;
