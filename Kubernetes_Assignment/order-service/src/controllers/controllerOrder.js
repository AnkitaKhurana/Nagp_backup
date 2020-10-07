const logger = require('../../logger');
const tracer = require('../utils/tracing');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

let getCurrentUserOrder = (req, res, next) => {
    logger.info('Extracting current user order');
    logger.info('Returning current user order');
    const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers)

    const span = tracer.startSpan('http_server', {
        childOf: parentSpanContext,
        tags: {[Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER}
    });    
    
    span.log({
        'event': 'format',
        'value': 'something'
    });

    span.finish();
    return res.json([
        {
            orderId : 1,
            orderAmount : 250,
            orderDate : "14-Apr-2020"
        }, 
        {
            orderId : 2,
            orderAmount : 450,
            orderDate : "15-Apr-2020"
        }
    ]);
}


module.exports = {
    getCurrentUserOrder
}