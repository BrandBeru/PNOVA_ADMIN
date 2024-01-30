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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = exports.USER_DOCUMENT = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const USER_DOCUMENT = 'users';
exports.USER_DOCUMENT = USER_DOCUMENT;
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    recoveryToken: {
        type: String,
        default: '',
    },
    provider: {
        type: String,
        default: 'pnova'
    },
    profilePicture: {
        type: String
    },
    lastLoginDate: {
        type: Date,
        default: Date.now()
    },
    meta: {
        createdDate: {
            type: Date,
            default: Date.now(),
        },
        modifiedDate: {
            type: Date,
            default: Date.now(),
        },
        isActive: {
            type: Boolean,
            default: false
        }
    }
});
exports.UserSchema = UserSchema;
const User = mongoose_1.default.models['users'] || mongoose_1.default.model(USER_DOCUMENT, UserSchema);
exports.User = User;
