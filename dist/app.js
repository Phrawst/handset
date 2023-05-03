"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// import routes from '/routes';
const app = (0, express_1.default)();
//set security HTTP headers
app.use((0, helmet_1.default)());
// set cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// parse json request body
app.use(express_1.default.urlencoded({ extended: true }));
// api routes
// app.use('/v1', routes);
exports.default = app;
