"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var app_1 = require("./app");
var server;
var url = 'mongodb://localhost:27017/db';
var config = {
    autoIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(url, config).then(function () {
    server = app_1.default.listen(3000, function () {
        console.log('Connected to MongoDB...');
    });
});
var exitHandler = function () {
    if (server) {
        server.close(function () {
            // logger.info('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
var unexpectedErrorHandler = function (error) {
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
