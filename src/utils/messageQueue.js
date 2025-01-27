const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL , EXCHANGE_NAME} = require('../config/ServerConfig')



const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL); // Setted up a connection with rabbitMQ server
        const channel = await connection.createChannel(); //  Created a channel 

        await channel.assertExchange(EXCHANGE_NAME, 'direct', false)   // Here we are setting up the exchange distributer
        return channel
    } catch (error) {
        throw error
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE')
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key)

        channel.consume(applicationQueue.queue, msg => {
            console.log("Recived data")
            console.log(msg.content.toString())
            channel.ack(msg)

        })
    } catch (error) {
        console.log("Error insuscribemessag2e ",error);

        throw error
    }

}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE')
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message))

    } catch (error) {
        throw error
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}