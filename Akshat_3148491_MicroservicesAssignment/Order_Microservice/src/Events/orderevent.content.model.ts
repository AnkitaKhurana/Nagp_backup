import { Product } from "../Models/order.model";

export interface OrderEventContent {
    userName: string;
    productsList: Product[];
}