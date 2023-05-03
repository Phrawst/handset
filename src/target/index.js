"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const handsets_1 = require("./route/handsets");
require("dotenv").config({ path: "./env.env" });
const winston = require("winston");
const port = process.env.PORT || 3001;
const dbName = process.env.DB_NAME;
const user = process.env.USER_NAME;
const dbPort = process.env.DB_PORT;
const password = process.env.PASSWORD;
const app = (0, express_1.default)();
const cors = require("cors");
const connectionTimeout = 10000;
const socketTimeoute = 45000;
app.use(cors());
app.use("/", handsets_1.route);
async function mongoConnect() {
    try {
        const options = {
            bufferCommands: false,
            connectTimeoutMS: connectionTimeout,
            socketTimeoutMS: socketTimeoute,
            family: 4,
        };
        await mongoose_1.default.connect(`mongodb://${user}:${password}@0.0.0.0:${dbPort}/${dbName}`, options);
    }
    catch (error) {
        throw error;
    }
}
mongoConnect()
    .then(() => {
    app.listen(port, () => {
        winston.info("Successfully connected to MongoDB.");
    });
})
    .catch((error) => {
    winston.error(`Error connecting to MongoDB: ${error}`);
    setTimeout(mongoConnect, 5000);
});
