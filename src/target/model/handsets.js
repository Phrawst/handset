"use strict";
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
handsetSchema.statics.findOneById = async function (id) {
    return this.findOne({ id }).exec();
};
const Handset = (0, mongoose_1.model)("handsets", handsetSchema);
exports.Handset = Handset;
