const express = require('express');
const bodyParser = require('body-parser')
const http = require('http');
const https = require('https');
const path = require('path')
const { normalizePort } = require('./utils/network');
const onFinished = require('on-finished');
const { sendJSON } = require('./response')
const json2Router = require('./router')

// Logger
global.logger = require('./logger')
global.config = require('./config');

// Database
global.db = require('./db')

const app = express();

app.set('x-powered-by', false)

let httpServer, httpsServer

if (global.config.http) {
    let httpPort = normalizePort(global.config.port[0] || global.config.port);
    app.set('http_port', httpPort);
    httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on('error', onError);
    httpServer.on('listening', () => {
        let addr = httpServer.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        global.logger.info('HTTP server is listening on ' + bind);
    });
}

if (global.config.https) {
    let httpsPort = normalizePort(global.config.port[1] || global.config.port);
    app.set('https_port', httpsPort);
    httpsServer = https.createServer(app);
    httpsServer.listen(httpsPort);
    httpsServer.on('error', onError);
    httpsServer.on('listening', () => {
        let addr = httpsServer.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        global.logger.info('HTTPS server is listening on ' + bind);
    });
}

function onError(error) {
    let port = error.port
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            global.logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            global.logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8',
    })
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

app.use(function (req, res, next) {
    const _json = res.json;
    let _body = null;
    res.json = function (body) {
        _body = body;
        _json.apply(res, arguments);
    };
    let logData = {
        method: req.method,
        ip: req.ip,
        url: req.url,
        body: req.body,
        query: req.query,
        headers: req.headers,
        host: req.headers.host,
        cookie: req.headers.cookie,
        user_agent: req.headers['user-agent']
    };
    onFinished(res, () => {
        logData.status_code = res.statusCode;
        if (_body) {
            logData.code = _body.code
            logData.msg = _body.msg
        }
        if(logData.url !== '/favicon.ico'){
            global.logger.network(logData.method, logData);
        }
    })
    next();
})

let routerList = json2Router(path.join(__dirname, '../routes.json'))

for (let key in routerList) {
    let addRouter = require(`${routerList[key]}`);
    app.use(key, addRouter);
}

// 404 Router
app.use(function (req, res, next) {
    sendJSON({
        req, res,
        code: -404
    })
})

/*
process.on('uncaughtException', (err) => {
    global.logger.error(err);
});
*/
module.exports = app