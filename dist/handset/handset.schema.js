"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handsetSchema = new mongoose_1.default.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    discount_price: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    spec: {
        display: {
            type: String,
            required: true
        },
        screen_width: {
            type: String,
            required: true
        },
        screen_height: {
            type: String,
            required: true
        }
    }
});
const Handset = mongoose_1.default.model('Handset', handsetSchema);
exports.default = Handset;
