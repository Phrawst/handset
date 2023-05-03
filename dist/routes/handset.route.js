"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../handset/index");
const router = express_1.default.Router();
router
    .route('/handset')
    .get(index_1.handsetController.getAllHandset);
exports.default = router;
