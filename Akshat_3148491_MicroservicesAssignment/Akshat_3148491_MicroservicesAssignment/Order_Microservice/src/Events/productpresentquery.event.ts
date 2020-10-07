import { IEvent } from "../Models/event.model";
import { OrderEventContent } from "./orderevent.content.model";
import { constants } from "../constants";
import { Order } from "../Models/order.model";

export class ProductPresentQueryEvent implements IEvent {
    public id: string;
    public content: OrderEventContent;
    public name: string = constants.PRODUCT_PRESENT_QUERY_EVENTNAME;

    constructor(order: Order) {
        this.id = order.id;
        this.content = {
            productsList: order.productsList,
            userName: order.userName
        }
    }
}