import { IEvent } from "../../Models/event.model";
import { constants } from "../../constants"
import { OrderController } from "../../Controllers/order.controller";

export class PaymentEventHandler {
    public static HandleEvent(event: any) {
        let _orderController: OrderController = new OrderController();
        event = JSON.parse(event);
        if(event.name === constants.PAYMENT_SUCCESS_EVENTNAME) {
            _orderController.MarkOrderSuccess(event.id);
        }
        if(event.name === constants.PAYMENT_FAIL_EVENTNAME) {
            _orderController.MarkOrderUnsuccessful(event.id);
        }
    }
}