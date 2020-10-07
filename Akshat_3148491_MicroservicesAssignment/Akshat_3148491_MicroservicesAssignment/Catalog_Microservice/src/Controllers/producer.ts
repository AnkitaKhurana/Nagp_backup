import amqp from 'amqplib';
import {constants} from '../constants';

export class Producer {
    private _amqp: any = amqp;
    private _channel!: amqp.Channel;
    private _connection!: amqp.Connection;
    constructor() {}

    public Publish = async (msg: any, queue: string) => {
        return this.SetupMessaging()
            .then((ok) => {
                console.log('[ * ] publishing to queue ', queue);
                return this._channel.assertQueue(queue)
                    .then((ok) => {
                        let published = this._channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
                        if(published) { 
                            console.log('[ * ] published to exchange ');
                        } else {
                            console.log('[ x ] error in publishing to exchange ');
                        }
                        return;
                    })
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
    }

    private CreateConnection = async () => {
        console.log('[ * ] creating connection');
        return this._amqp.connect('amqp://rabbitmq:5672')
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

    // private CreateExchange = async () => {
    //     console.log('[ * ] creating exchange ', constants.USER_FANOUT_EXCHANGE);
    //     return this._channel.assertExchange(constants.USER_FANOUT_EXCHANGE, 'fanout')
    //                 .then((ok) => {
    //                     console.log('[ * ] exchange ', constants.USER_FANOUT_EXCHANGE, ' created');
    //                     return ok;
    //                 })
    //                 .catch((err) => {
    //                     console.log('[ x ] error in creating exchange ', constants.USER_FANOUT_EXCHANGE, ' retrying in 2 seconds');
    //                     setTimeout(() => { return this.CreateExchange(); }, 2000);
    //                 })
    // }
}