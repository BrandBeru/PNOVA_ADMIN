"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.New = exports.NewSchema = exports.NEW_DOCUMENT = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NEW_DOCUMENT = 'news';
exports.NEW_DOCUMENT = NEW_DOCUMENT;
const NewSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    by: { type: String, required: true, default: 'PNOVA STUDIIOS' },
    likes: { type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users' }], required: true },
    paragraphs: { type: [String], required: true },
    pictures: { type: [String], required: true },
    meta: {
        createdDate: { type: Date, default: new Date() },
        modifiedDate: { type: Date, default: new Date() },
    }
});
exports.NewSchema = NewSchema;
const New = mongoose_1.default.model(NEW_DOCUMENT, NewSchema);
exports.New = New;
