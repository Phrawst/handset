const { Kafka } = require("kafkajs");
const winston = require("winston");

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
    winston.info("Kafka topic initialized successfully");
    await producer.connect();
    await consumer.connect();
  } catch (err) {
    winston.error("Error connecting to Kafka: ", err);
  }
}

async function subscribeToTopic(topic: string) {
  try {
    await consumer.subscribe({ topic: topic, fromBeginning: true });
  } catch (err) {
    console.error("Error subscribing to a kafka producer: ", err);
  }
}

async function sendHandsetJson(topic: string, handsets: JSON) {
  try {
    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(handsets) }],
    });
  } catch (err) {
    console.error("Error sending a message with Kafka producer: ", err);
  }
}

export { initializeKafka, sendHandsetJson, subscribeToTopic, admin, producer, consumer };
