const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require('../config/serverConfig');

const createChannel = async() => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async(channel, service, binding_key) => {
    const appQueue = await channel.assertQueue('REMINDER_QUEUE');
    
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
    
    channel.consume(appQueue.queue, (msg) => {
        console.log("Received data");
        const payload = JSON.parse(msg.content.toString());
        service(payload);
        channel.ack(msg);
    })
}

const publishMessage = async(channel, binding_key, message) => {
    try {
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error; 
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage,
}