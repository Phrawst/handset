"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToTopic = exports.sendHandsetJson = exports.initializeKafka = void 0;
const { Kafka } = require("kafkajs");
const kafkaMiddleWare = new Kafka({
    clientId: "handsets-app",
    brokers: ["localhost:9092"],
});
const admin = kafkaMiddleWare.admin();
const producer = kafkaMiddleWare.producer();
const consumer = kafkaMiddleWare.consumer({ groupId: "handsets-group" });
async function initializeKafka() {
    try {
        await admin.connect();
        await admin.createTopics({
            topics: [
                {
                    topic: "handsets-created",
                    numPartitions: 1,
                },
            ],
        });
        console.log("Kafka topic initialized successfully");
        await producer.connect();
        await consumer.connect();
    }
    catch (err) {
        console.error("Error connecting to Kafka: ", err);
    }
}
exports.initializeKafka = initializeKafka;
async function subscribeToTopic(topic) {
    try {
        await consumer.subscribe({ topic: topic, fromBeginning: true });
    }
    catch (err) {
        console.error("Error subscribing to a kafka producer: ", err);
    }
}
exports.subscribeToTopic = subscribeToTopic;
async function sendHandsetJson(topic, handsets) {
    try {
        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(handsets) }],
        });
    }
    catch (err) {
        console.error("Error sending a message with Kafka producer: ", err);
    }
}
exports.sendHandsetJson = sendHandsetJson;
