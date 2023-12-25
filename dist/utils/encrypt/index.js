"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption = exports.encryption = void 0;
const config_1 = __importDefault(require("../../config/config"));
const crypto_1 = __importStar(require("crypto"));
const algorithm = config_1.default.encode_algorithm;
const key = crypto_1.default.scryptSync(config_1.default.encode_password, 'salt', 32);
function encryption(text) {
    return new Promise((resolve, reject) => {
        const iv = crypto_1.default.randomBytes(16);
        const cipher = (0, crypto_1.createCipheriv)(algorithm, key, iv);
        let ciph = cipher.update(text, 'utf-8', 'base64');
        ciph += cipher.final('base64');
        resolve({ ciph, iv: iv.toString('hex') });
    });
}
exports.encryption = encryption;
function decryption(encrypt, ivData) {
    return new Promise((resolve, reject) => {
        const iv = Buffer.from(ivData, 'hex');
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
        let text = decipher.update(encrypt, 'base64', 'utf-8');
        text += decipher.final('utf8');
        resolve(text);
    });
}
exports.decryption = decryption;
