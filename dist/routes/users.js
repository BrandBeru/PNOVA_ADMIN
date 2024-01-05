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
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../services/user.service"));
const users_schema_1 = require("../schemas/users.schema");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const passport_1 = __importDefault(require("passport"));
const auth_handler_1 = require("../middlewares/auth.handler");
const router = express_1.default.Router();
const service = new user_service_1.default();
router.get("/name/:name", (0, validator_handler_1.default)(users_schema_1.findUserByName, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const rta = yield service.findByName(name);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:username", passport_1.default.authenticate("jwt", { session: true }), (0, auth_handler_1.checkRoles)("user", "admin"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const rta = yield service.findbyUsername(username);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(users_schema_1.createUserSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield service.create(body);
        res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/edit", passport_1.default.authenticate("jwt", { session: true }), (0, validator_handler_1.default)(users_schema_1.getUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.user.sub;
        const body = req.body;
        const rta = yield service.updateOne(username, body);
        res.status(200).json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/", (0, validator_handler_1.default)(users_schema_1.getUserSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("(DELETE) users/");
}));
exports.default = router;
