const logger = require('../../logger');
const tracer = require('../utils/tracing');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');
const con = require('../database/mysqlConnection');

let getCurrentUser = (req, res, next) => {
    logger.info('Extracting current user');
    logger.info('Returning user');
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
    var data = con.query('SELECT * FROM User where id='+req.params.id, function (err, result) {
        if (err) throw err;
        console.log(result[0]);
        return res.json(result[0])
      });   
}


module.exports = {
    getCurrentUser
}