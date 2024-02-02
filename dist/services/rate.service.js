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
const rate_model_1 = require("../db/models/rate.model");
class RateService {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = (yield rate_model_1.Rate.create(body)).populate({
                path: 'userId',
                select: 'username name lastName email meta profilePicture'
            });
            return rate;
        });
    }
    find(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const rates = yield rate_model_1.Rate.find({}).populate({
                path: 'userId',
                select: 'username name lastName email meta profilePicture'
            }).skip(skip).limit(limit);
            return rates;
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = yield rate_model_1.Rate.findOne({ userId: id });
            return rate;
        });
    }
    findByRating(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const rates = yield rate_model_1.Rate.find({})
                .populate({
                path: "userId",
                select: 'username name lastName email profilePicture'
            })
                .skip(skip)
                .limit(limit)
                .sort({ rate: -1 });
            return rates;
        });
    }
    findByRate(rate, asc, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = asc ? 1 : -1;
            const rates = yield rate_model_1.Rate.find({ rate: rate })
                .sort({ rate: sort })
                .skip(skip)
                .limit(limit);
            return rates;
        });
    }
    findByServiceId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = yield rate_model_1.Rate.find({ serviceId: id });
            return rate;
        });
    }
}
exports.default = RateService;
