import { IEvent } from "../../Models/event.model";
import { constants } from "../../constants"
import { OrderController } from "../../Controllers/order.controller";

export class CatalogEventHandler {
    public static HandleEvent(event: any) {
        let _orderController: OrderController = new OrderController();
        event = JSON.parse(event);
        if(event.name === constants.PRODUCT_PRESENT_QUERY_RESPONSE_EVENTNAME) {
            if(event.content === true) {
                _orderController.MarkOrderSuccess(event.id);
            }
            else {
                _orderController.MarkOrderUnsuccessful(event.id);
            }
        }

    }
}