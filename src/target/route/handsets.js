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
exports.route = void 0;
const handsets_1 = require("../model/handsets");
const express_1 = require("express");
const Joi = require("Joi");
const HANDSET_ERROR_MESSAGES = {
    400: "Bad request. Please check the request payload and try again.",
    401: "Unauthorized. Please provide a valid authentication token.",
    403: "Forbidden. You do not have sufficient permissions to perform this action.",
    404: "The handset not found, please check if the provided id is correct.",
    409: "Conflict. The request conflicts with the current state of the resource.",
    500: "Internal server error. Please try again later.",
};
const handsetSchema = Joi.object({
    id: Joi.number().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().required(),
    color: Joi.string().required(),
    storage: Joi.string().required(),
    spec: Joi.object({
        display: Joi.string().required(),
        screen_width: Joi.number().required(),
        screen_height: Joi.number().required(),
    }).required(),
});
const parser = require("body-parser");
const route = (0, express_1.Router)();
exports.route = route;
route.use(parser.json());
route.use(parser.urlencoded({ extended: true }));
route.get("/handsets", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const handsets = yield handsets_1.Handset.find();
    res.json(handsets);
}));
route.get("/handsets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let handset = yield handsets_1.Handset.findById(req.params.id);
    if (!handset) {
        res.status(404).json({ error: "handset not found" });
    }
    else {
        res.json(handset);
    }
}));
route.post("/handsets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, brand, model, price, discount, discounted_price, color, storage, spec: { display, screen_width, screen_height }, } = req.body;
    let handset = new handsets_1.Handset({
        id: id,
        brand: brand,
        model: model,
        price: price,
        discount: discount,
        discounted_price: discounted_price,
        color: color,
        storage: storage,
        spec: {
            display: display,
            screen_width: screen_width,
            screen_height: screen_height,
        },
    });
    const { error } = handsetSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const existinghandset = yield handsets_1.Handset.findOne({ id: id });
    if (!existinghandset) {
        yield handset.save();
        return res.json(handset);
    }
    return res.status(409).json({ error: HANDSET_ERROR_MESSAGES[409] });
}));
route.delete("/handsets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let handset = yield handsets_1.Handset.findByIdAndRemove(req.params.id);
    if (!handset) {
        res.status(404).json({
            error: "The handset not found, please check if the provided id is correct.",
        });
    }
    else {
        res.json(handset);
    }
}));
