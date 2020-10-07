import amqp from 'amqplib';
import {constants} from '../constants'
import { OrderEventHandler } from '../Events/EventHandlers/orderevent.handler';

export class Consumer {
    private _amqp: any = amqp;
    private _channel!: amqp.Channel;
    private _connection!: amqp.Connection;
    private _queuesToBind: string[] = []
    private _queues: string[] = [
        constants.ORDER_CATALOG_QUEUE
    ]
    constructor() {}

    public Consume = async () => {
        this.SetupMessaging()
            .then((ok) => {
                console.log('[ * ] retreiving from queue to exchange ');
                this._channel.prefetch(5);
                this._queues.forEach((queue: string) => {
                    this._channel.consume(queue, (msg) => {
                        console.log('[ * ] received msg from ', queue);
                        OrderEventHandler.HandleEvent(msg);
                        if(msg) {
                            console.log('[ * ] sending ack ', queue);
                            this._channel.ack(msg);
                            console.log('[ * ] ack sent', queue);
                            return;
                        }
                    })
                })
                return;
            })
    }

    public CloseConnection = async (connection?: amqp.Connection) => {
        if(connection) { 
            connection.close(); 
            console.log('[ * ] connection closed');
            return;
        }
        return this._connection.close();
    }

    private SetupMessaging() {
        return this.CreateConnection()
                .then((conn: any) => this.CreateChannel())
                .then((ch: amqp.Channel) => this.BindQueues())
    }
    
    private CreateConnection = async () => {
        console.log('[ * ] creating connection');
        return this._amqp.connect(constants.RABBITMQ_URI)
                    .then((conn: any) => {
                        // This ensures there are not more than one connection, as a new process might overwrite 
                        // the previously set connection value. Extra channels are created on a single connection.
                        if(!this._connection) { 
                            console.log('[ * ] connection established');
                            this._connection = conn;
                        } else {
                            console.log('[ * ] more than 1 connection established, closing latest connection');
                            this.CloseConnection(conn);
                        }
                        return this._connection;
                    })
                    .catch((err: any) => { 
                        // If error in creating connection, retry after 2 seconds
                        console.log('[ x ] error in establishing connection, retrying after 2 seconds');
                        return setTimeout(() => { this.CreateConnection(); }, 2000);
                    })
    }

    private CreateChannel = async () => {
        if(!this._connection) {
            await this.CreateConnection();
        }
        console.log('[ * ] creating channel');
        return this._connection.createChannel()
                    .then((ch: amqp.Channel) => {
                        console.log('[ * ] channel created');
                        this._channel = ch;
                        return this._channel;
                    })
                    .catch((err) => {
                        console.log('[ x ] error in creating channel, retrying in 2 seconds');
                        setTimeout(() => { return this.CreateChannel(); }, 2000);
                        return this._channel
                    })
    }

    private BindQueues() {
        this._queuesToBind.forEach((queue) => {
            this._channel.assertQueue(queue, {durable: true})
                .then((ok) => {
                    this._channel.bindQueue(queue, constants.USER_FANOUT_EXCHANGE, '');
                })
        })
    }
}