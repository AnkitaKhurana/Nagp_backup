import { IEvent } from "../Models/event.model";
import { Order } from "../Models/order.model";
import { OrderEventContent } from "./orderevent.content.model";
import { constants } from "../constants";

export class OrderFailEvent implements IEvent {
    public id: string;
    public content: OrderEventContent;
    public name: string = constants.ORDER_FAIL_EVENTNAME;

    constructor(order: Order) {
        this.id = order.id;
        this.content = {
            productsList: order.productsList,
            userName: order.userName
        }
    }
}