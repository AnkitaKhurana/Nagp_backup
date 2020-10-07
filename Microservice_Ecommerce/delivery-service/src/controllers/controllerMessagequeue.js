const amqp = require('amqplib');
const logger = require('../../logger');

let channel = {};
// make connection to rabbitmq server 
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel();
        // publish to queue 
        const result = await channel.assertQueue(process.env.QUEUE_NAME);
    }
    catch (ex) {
        console.log(ex);
    }
}

const publishToQueue = async (data) => {
    try {
        logger.info('Publishing to queue');
        channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(data)));
    }
    catch (ex) {
        console.log(ex);
    }
}

process.on('exit', (code) => {
    channel.close();
    console.log(`Closing rabbitmq channel`);
    logger.info('Closing rabbitmq channel');
});


module.exports = {
    connect,
    publishToQueue
}