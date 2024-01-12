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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantAccess = void 0;
require('dotenv').config();
const secret_manager_1 = require("@google-cloud/secret-manager");
const secretId = 'projects/573935121603/secrets/PnovaSecrets/versions/latest';
function grantAccess(parent) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const client = new secret_manager_1.SecretManagerServiceClient();
        const request = {
            parent,
        };
        const iterable = yield client.listSecretsAsync(request);
        try {
            for (var _d = true, iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = yield iterable_1.next(), _a = iterable_1_1.done, !_a; _d = true) {
                _c = iterable_1_1.value;
                _d = false;
                const response = _c;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = iterable_1.return)) yield _b.call(iterable_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.grantAccess = grantAccess;
const config = {
    env: process.env.NODE_ENV || '',
    port: process.env.PORT || '',
    host: process.env.NODE_HOST || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || '',
    dbHost: process.env.DB_HOST || '',
    dbPort: process.env.DB_PORT || '',
    jwtSecret: process.env.JWT_SECRET || '',
    apiKey: process.env.API_KEY || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    callbackUrl: process.env.CALLBACK_URL || '',
    mClientId: process.env.M_CLIENT_ID || '',
    mClientSecret: process.env.M_CLIENT_SECRET || '',
    mCallbackUrl: process.env.M_CALLBACK_URL || '',
    tConsumerSecret: process.env.T_CONSUMER_SECRET || '',
    tCallbackUrl: process.env.T_CALLBACK_URL || '',
    tConsumerKey: process.env.T_CONSUMER_KEY || '',
    project: process.env.PROJECT || '',
    version: process.env.VERSION || '',
    encode_password: process.env.ENCODE_PASSWORD || '',
    encode_initial: process.env.ENCODE_INITIAL || '',
    encode_algorithm: process.env.ENCODE_ALGORITHM || '',
    frontend_url: process.env.FRONTEND_URL || '',
    email_host: process.env.EMAIL_HOST || '',
    email_user: process.env.EMAIL_USER || '',
    email_password: process.env.EMAIL_PASSWORD || ''
};
exports.default = config;
