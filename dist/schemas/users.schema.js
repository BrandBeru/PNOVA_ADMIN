"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByName = exports.deleteUserSchema = exports.getUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const name = joi_1.default.string().min(3).max(100);
const lastName = joi_1.default.string().min(3).max(100);
const username = joi_1.default.string().min(5).max(50);
const email = joi_1.default.string().email();
const password = joi_1.default.string().min(6).max(150);
const createUserSchema = joi_1.default.object({
    name: name.required(),
    lastName: lastName.required(),
    username: username.required(),
    email: email.required(),
    password: password.required(),
});
exports.createUserSchema = createUserSchema;
const getUserSchema = joi_1.default.object({
    username: username.required()
});
exports.getUserSchema = getUserSchema;
const findUserByName = joi_1.default.object({
    name: name.required().min(3)
});
exports.findUserByName = findUserByName;
const deleteUserSchema = joi_1.default.object({
    username: username.required()
});
exports.deleteUserSchema = deleteUserSchema;
