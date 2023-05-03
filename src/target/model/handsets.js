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
exports.Handset = void 0;
const mongoose_1 = require("mongoose");
const handsetSchema = new mongoose_1.Schema({
    id: { type: Number },
    brand: { type: String },
    model: { type: String },
    price: { type: String },
    color: { type: String },
    storage: { type: String },
    spec: {
        type: {
            display: { type: String },
            screen_width: { type: String },
            screen_height: { type: String },
        },
    },
});
handsetSchema.statics.findOneById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ id }).exec();
    });
};
const Handset = (0, mongoose_1.model)("handsets", handsetSchema);
exports.Handset = Handset;
