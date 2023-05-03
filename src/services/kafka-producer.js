const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Replace with your Kafka brokers
});

const producer = kafka.producer();

async function runProducer() {
  // Producing
  await producer.connect();
  await producer.send({
    topic: 'my-topic',
    messages: [
      { value: 'Hello producer!' }
    ]
  });

  await producer.disconnect();
}

runProducer().catch(console.error);

