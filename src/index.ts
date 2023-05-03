import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { route } from "./route/handsets";

require("dotenv").config({ path: "./env.env" });
const winston = require("winston");

const port = process.env.PORT || 3001;
const dbName = process.env.DB_NAME;
const user = process.env.USER_NAME;
const dbPort = process.env.DB_PORT;
const password = process.env.PASSWORD;

const app = express();
const cors = require("cors");
const connectionTimeout = 10000;
const socketTimeoute = 45000;

app.use(cors());
app.use("/", route);

async function mongoConnect() {
  try {
    const options: ConnectOptions = {
      bufferCommands: false,
      connectTimeoutMS: connectionTimeout,
      socketTimeoutMS: socketTimeoute,
      family: 4,
    };
    await mongoose.connect(
      `mongodb://${user}:${password}@0.0.0.0:${dbPort}/${dbName}`,
      options
    );
  } catch (error) {
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
