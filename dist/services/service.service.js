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
const service_model_1 = require("../db/models/service.model");
class ServiceService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield service_model_1.Service.create(body);
            const services = yield this.find();
            return services;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield service_model_1.Service.find({});
            return services;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield service_model_1.Service.find({ _id: id });
            return service;
        });
    }
    updateById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield service_model_1.Service.updateOne({ _id: id });
            return rta;
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = ServiceService;
