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
function mongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                bufferCommands: false,
                connectTimeoutMS: connectionTimeout,
                socketTimeoutMS: socketTimeoute,
                family: 4,
            };
            yield mongoose_1.default.connect(`mongodb://${user}:${password}@0.0.0.0:${dbPort}/${dbName}`, options);
        }
        catch (error) {
            throw error;
        }
    });
}
function intitialHandsets() {
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
}
intitialHandsets();
