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
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_handler_1 = require("../middlewares/auth.handler");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const auth_schema_1 = require("../schemas/auth.schema");
const router = express_1.default.Router();
const service = new auth_service_1.default();
const userService = new user_service_1.default();
router.post("/login", passport_1.default.authenticate("local", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const rta = yield service.signToken(user);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/google", passport_1.default.authenticate("google", { scope: ['email', 'profile'] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/api/v1/auth/google" }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userCb = req.user;
        const user = yield userService.existUsersByEmail(userCb.email);
        if (user.length) {
            const token = yield service.signToken(user[0]);
            res.json(token);
        }
        const rta = yield userService.create(userCb);
        const token = yield service.signToken(rta);
        res.json(token);
        res.redirect("/");
    }
    catch (error) {
        next(error);
    }
}));
router.post('/recovery', passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.sub;
        const rta = yield service.sendRecoveryPassword(id);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.patch('/change-password', passport_1.default.authenticate('jwt', { session: true }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword } = req.body;
        const rta = yield service.changePassword(token, newPassword);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/send-email', (0, validator_handler_1.default)(auth_schema_1.sendEmailSchema, 'body'), passport_1.default.authenticate('jwt', { session: true }), (0, auth_handler_1.checkRoles)('admin'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const object = {
            subject: req.body.subject,
            html: req.body.html
        };
        const rta = yield service.sendEmailToClients(object.subject, object.html);
        res.json(rta);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
