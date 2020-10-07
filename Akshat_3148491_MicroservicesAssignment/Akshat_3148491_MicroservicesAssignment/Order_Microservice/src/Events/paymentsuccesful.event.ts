import { OrderEventContent } from "./orderevent.content.model";

export interface PaymentCompleted {
    id: string;
    content: OrderEventContent;
    name: string;
}