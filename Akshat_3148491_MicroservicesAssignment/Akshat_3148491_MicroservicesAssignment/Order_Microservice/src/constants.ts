export const constants = {
    USER_FANOUT_EXCHANGE: 'user.fanout.exchange',
    USER_ORDER_QUEUE: 'user.order.queue',
    CART_ORDER_QUEUE: 'cart.order.queue',
    PAYMENT_ORDER_QUEUE: 'payment.order.queue',
    CATALOG_ORDER_QUEUE: 'catalog.order.queue',
    RABBITMQ_URI: 'amqp://rabbitmq:5672',
    PAYMENT_SUCCESS_EVENTNAME: 'PaymentSuccess',
    PAYMENT_FAIL_EVENTNAME: 'PaymentFail',
    ORDER_FAIL_EVENTNAME: 'OrderFail',
    ORDER_SUCCESS_EVENTNAME: 'OrderSuccess',
    ORDER_CART_QUEUE: 'order.cart.queue',
    ORDER_CATALOG_QUEUE: 'order.catalog.queue',
    PRODUCT_PRESENT_QUERY_EVENTNAME: 'ProductPresentQuery',
    PRODUCT_PRESENT_QUERY_RESPONSE_EVENTNAME: 'ProductPresentQueryResponse'
}