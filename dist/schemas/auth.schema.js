"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateUserSchema = exports.sendEmailSchema = exports.loginUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().min(3);
const password = joi_1.default.string().min(6).max(200);
const subject = joi_1.default.string().min(5).max(50);
const to = joi_1.default.string().min(3).max(10);
const greeting = joi_1.default.string().min(5);
const info = joi_1.default.string().min(5);
const farewell = joi_1.default.string().min(5);
const clientEmail = joi_1.default.string().min(5);
const paragraphs = joi_1.default.array();
const url = joi_1.default.string().uri();
const text = joi_1.default.string().min(3);
const button = joi_1.default.object({
    url: url.required(),
    text: text.required()
});
const html = joi_1.default.object({
    greeting: greeting.required(),
    info: info.required(),
    button: button.required(),
    farewell: farewell.required(),
    clientEmail: clientEmail.required(),
    paragraph: paragraphs.required()
});
const loginUserSchema = joi_1.default.object({
    email: email.required(),
    password: password.required()
});
exports.loginUserSchema = loginUserSchema;
const sendEmailSchema = joi_1.default.object({
    subject: subject.required(),
    to: to.required(),
    html: html.required()
});
exports.sendEmailSchema = sendEmailSchema;
const activateUserSchema = joi_1.default.object({
    email: email.required()
});
exports.activateUserSchema = activateUserSchema;
