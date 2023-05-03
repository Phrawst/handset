"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandset = exports.getAllHandset = void 0;
const handset_schema_1 = __importDefault(require("./handset.schema"));
const getAllHandset = async () => {
    return handset_schema_1.default.find();
};
exports.getAllHandset = getAllHandset;
const createHandset = async (handsetBody) => {
    try {
        const newHandset = await handset_schema_1.default.create(handsetBody);
        return newHandset;
    }
    catch (error) {
        throw new Error(`Error creating handset`);
    }
};
exports.createHandset = createHandset;
