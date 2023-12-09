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
Object.defineProperty(exports, "__esModule", { value: true });
const group_model_1 = require("../db/models/group.model");
class GroupService {
    create(body, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, body), { admins: [adminId] });
            const group = yield group_model_1.Group.create(data);
            return group;
        });
    }
    findByMember() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = GroupService;
