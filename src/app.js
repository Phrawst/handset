"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var helmet_1 = require("helmet");
var cors_1 = require("cors");
// import routes from '/routes';
var app = (0, express_1.default)();
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
