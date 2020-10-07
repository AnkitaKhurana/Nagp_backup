const axios = require('axios');
const logger = require('../../logger');
const sourceOrder = process.env.ORDER_URL||"http://localhost:3002";
const sourceUser = process.env.USER_URL||"http://localhost:3001";
const tracer = require('../utils/tracing');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

async function findOrderDetails(userId, root_span) {
    const span = tracer.startSpan('format', {childOf: root_span.context()});
    const headers = {};
    span.log({
        'event': 'find-user',
        'value': 'service call'
    });
    var url =  sourceOrder+'/orders/' + userId;
    span.setTag(Tags.HTTP_URL, url);
    span.setTag(Tags.HTTP_METHOD,  'get');
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    return axios({
        method: 'get',
        url: sourceOrder+'/orders/' + userId,
        headers:headers
    });
}

async function findUserDetails(userId, root_span) {
    const span = tracer.startSpan('format', {childOf: root_span.context()});
    const headers = {};
    span.log({
        'event': 'find-user',
        'value': 'service call'
    });
    var url =  sourceUser +'/user/' + userId;
    span.setTag(Tags.HTTP_URL, url);
    span.setTag(Tags.HTTP_METHOD,  'get');
    span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    return axios({
        method: 'get',
        url: sourceUser +'/user/' + userId,
        headers:headers
    });

}

let getCurrentOrder = (req, res, next) => {
    logger.info('Extracting current user');
    const span = tracer.startSpan('aggregate');
    span.setTag('aggregate','service');

    findUserDetails(req.params['id'], span).then(user => {
        if (!user) {
            logger.info('No Data from user service');
            return res.sendStatus(404);
        }
        else {
            findOrderDetails(req.params['id'], span).then(orders => {
                if (!orders) {
                    logger.info('No Data from order service');
                    return res.sendStatus(404);
                }
                else {
                    user = JSON.stringify(user.data);
                    orders = JSON.stringify(orders.data);
                    logger.info('Returning order');
                    span.finish();
                    tracer.close();

                    return res.json(
                        JSON.parse("{ \"user\": " + user + ', \"orders\": ' + orders + "}")
                    );
                }
            })

        }

    }).catch(err=>{
        console.log(err)
        logger.error(err); 
    });
}


module.exports = {
    getCurrentOrder
}