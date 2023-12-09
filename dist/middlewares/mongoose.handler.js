"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("@hapi/boom"));
function MongooseHandler(schema, property) {
    return (req, res, next) => {
        try {
            schema.pre(property, function () {
                throw boom_1.default.badData();
            });
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
exports.default = MongooseHandler;
