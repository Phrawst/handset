"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: { type: String },
    status: { type: String, default: "undone" },
});
const Todo = (0, mongoose_1.model)("todo", todoSchema);
exports.Todo = Todo;
