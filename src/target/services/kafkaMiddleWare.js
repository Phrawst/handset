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
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = exports.admin = exports.subscribeToTopic = exports.sendHandsetJson = exports.initializeKafka = void 0;
const { Kafka } = require("kafkajs");
const winston = require("winston");
const kafkaMiddleWare = new Kafka({
    clientId: "handsets-app",
    brokers: ["localhost:9092"],
});
const admin = kafkaMiddleWare.admin();
exports.admin = admin;
const producer = kafkaMiddleWare.producer();
exports.producer = producer;
const consumer = kafkaMiddleWare.consumer({ groupId: "handsets-group" });
exports.consumer = consumer;
function initializeKafka() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield admin.connect();
            yield admin.createTopics({
                topics: [
                    {
                        topic: "handsets-created",
                        numPartitions: 1,
                    },
                ],
            });
            winston.info("Kafka topic initialized successfully");
            yield producer.connect();
            yield consumer.connect();
        }
        catch (err) {
            winston.error("Error connecting to Kafka: ", err);
        }
    });
}
exports.initializeKafka = initializeKafka;
function subscribeToTopic(topic) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield consumer.subscribe({ topic: topic, fromBeginning: true });
        }
        catch (err) {
            console.error("Error subscribing to a kafka producer: ", err);
        }
    });
}
exports.subscribeToTopic = subscribeToTopic;
function sendHandsetJson(topic, handsets) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield producer.send({
                topic: topic,
                messages: [{ value: JSON.stringify(handsets) }],
            });
        }
        catch (err) {
            console.error("Error sending a message with Kafka producer: ", err);
        }
    });
}
exports.sendHandsetJson = sendHandsetJson;
