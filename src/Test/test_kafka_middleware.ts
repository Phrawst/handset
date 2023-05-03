import { describe, beforeEach, before, afterEach, test } from "node:test";
import * as kafkaMiddleWare from "../services/kafkaMiddleWare";
const { Kafka } = require("kafkajs");
const { initializeKafka } = require("./kafka");

describe("Kafka initialization", () => {
  let admin = kafkaMiddleWare.admin();
  let producer = kafkaMiddleWare.producer();
  let consumer = kafkaMiddleWare.consumer({ groupId: "handsets-group" });

  beforeEach(async () => {
    const kafkaMiddleWare = new Kafka({
      clientId: "handsets-app",
      brokers: ["localhost:9092"],
    });

    await initializeKafka(admin, producer, consumer);
  });

  afterEach(async () => {
    await admin.disconnect();
    await producer.disconnect();
    await consumer.disconnect();
  });
  test("should initialize Kafka topics successfully", async () => {
    const topicMetadata = await admin.fetchTopicMetadata({
      topics: ["handsets-created"],
    });
  });
});

//   });

//   test("should connect to Kafka producer and consumer", async () => {
//     expect(producer.isConnected()).toBe(true);
//     expect(consumer.isConnected()).toBe(true);
//   });
// });
