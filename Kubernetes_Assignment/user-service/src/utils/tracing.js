var initTracer = require('jaeger-client').initTracer;
var PrometheusMetricsFactory = require('jaeger-client').PrometheusMetricsFactory;
var promClient = require('prom-client');
var logger = require('../../logger');
var collectorUrl = process.env.JAEGER_COLLECTOR||"localhost";
var collectorHost = process.env.JAEGER_HOST||14268;
var config = {
    serviceName: 'userservice',
    sampler:{
        type:"const",
        param: 1
    },
    reporter: {
        collectorEndpoint: collectorUrl+":"+collectorHost+'/api/traces'
    }
};
var namespace = config.serviceName;
var metrics = new PrometheusMetricsFactory(promClient, namespace);
var options = {
    tags: {
        'user-service.version': '1.0.0',
    },
    metrics: metrics,
    logger: logger
};
var tracer = initTracer(config, options);
module.exports = tracer;