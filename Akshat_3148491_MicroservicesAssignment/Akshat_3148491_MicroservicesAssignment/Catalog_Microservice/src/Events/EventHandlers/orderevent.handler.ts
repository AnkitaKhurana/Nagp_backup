import { constants } from "../../constants"
import { ProductController } from "../../Controllers/product.controller";

export class OrderEventHandler {
    public static HandleEvent(event: any) {
        let _productsController: ProductController = new ProductController();
        event = JSON.parse(event);
        if(event.name === constants.PRODUCT_PRESENT_QUERY_EVENTNAME) {
            _productsController.CheckProducts(event.content.productsList, event.id);
        }

    }
}