"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const options = {
    clientID: '988821143071-h765n0ffhvndm52p7ofgkkp0e44puu4e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/api/v1/auth/google/callback',
};
const verifyHandler = (accessToken, refreshToken, profile, cb, done) => {
    const data = {
        id: cb.id,
        name: cb.displayName,
        email: cb.emails[0].value,
        emailVerified: cb.emails[0].verified
    };
    return done(null, data);
};
const GoogleOAuth = new GoogleStrategy(options, verifyHandler);
exports.default = GoogleOAuth;
