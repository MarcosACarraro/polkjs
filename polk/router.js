var http = require('http');

var createRouter = function (port) {
    var api = {};
    var routes = {};
    var methods = ['GET', 'POST', 'OPTIONS'];
    var interceptors = [];

    methods.forEach(function (method) {
        routes[method] = {};
        api[method.toLowerCase()] = function (path, fn) {
            routes[method][path] = fn;
        };
    });

    api.interceptor = function (interceptor) {
        interceptors.push(interceptor);
    };

    var executeInterceptors = function (number, req, res) {
        var interceptor = interceptors[number];
        if (!interceptor) return;
        interceptor(req, res, function () {
            executeInterceptors(++number, req, res);
        });
    };

    var handleBody = function (req, res, next) {
        var body = [];
        req.on('data', function (chunk) {
            body.push(chunk);
        });
        req.on('end', function () {
            req.body = Buffer.concat(body).toString();
            next();
        });
    };

    var _getparameters = function (req) {
        var parameters = [];
        var result = {};
        var stringParameters = {};
        var q = req.url.split('?');
        if (q.length >= 2) {
            stringParameters = q[1].split('&');
            for (var i = 0; i < stringParameters.length; i++) {
                itens = stringParameters[i].split('=');
                var result = {};
                result.parameter = itens[0];
                result.value = itens[1];
                parameters.push(result);
            }
        }
        return parameters;
    }

    var _getUrl = function (req) {
        var q = req.url.split('?');
        return q[0];
    }
 
    http.createServer(function (req, res) {
        var parameters = _getparameters(req);
        req.url = _getUrl(req);
        req.parameters = parameters;
        handleBody(req, res, function () {
            executeInterceptors(0, req, res);
            if (!routes[req.method][req.url]) {
                res.statusCode = 404;
                return res.end();
            }
            routes[req.method][req.url](req, res);
        });
    }).listen(port);

    return api;
};

module.exports = createRouter;