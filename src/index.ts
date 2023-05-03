import mongoose from "mongoose";
import app from "./app";


let server: any;
const url = 'mongodb://localhost:27017/db'
const config = {
    autoIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(url, config).then(() => {
    server = app.listen(3000, () => {
        console.log('Connected to MongoDB...');
    })
})

const exitHandler = () => {
    if (server) {
        server.close(() => {
            // logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: string) => {
    // logger.error(error);
    console.log(error)
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
