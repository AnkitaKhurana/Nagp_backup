import { IEvent } from "../Models/event.model";
import { constants } from "../constants";

export class ProductQueryResponse implements IEvent {
    public id: string;
    public content: Boolean;
    public name: string = constants.PRODUCT_PRESENT_QUERY_RESPONSE_EVENTNAME;

    constructor(res: Boolean, orderId: string) {
        this.id = orderId;
        this.content = res;
    }
}