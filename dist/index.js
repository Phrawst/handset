"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const url = 'mongodb://localhost:27017/db';
const config = {
    autoIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(url, config).then(() => {
    server = app_1.default.listen(3000, () => {
        console.log('Connected to MongoDB...');
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            // logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    // logger.error(error);
    console.log(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
// process.on('SIGTERM', () => {
//     // logger.info('SIGTERM received');
//     if (server) {
//         server.close();
//     }
// });
