const consoleLogger = require('./console')
const fileLogger = require('./file')

const logger = {
    info: (msg) => {
        consoleLogger.info(msg)
        fileLogger.info(msg)
    },
    warn: (msg) => {
        consoleLogger.warn(msg)
        fileLogger.warn(msg)
    },
    error: (msg) => {
        consoleLogger.error(msg)
        fileLogger.error(msg)
    },
    log: (method, msg) => {
        consoleLogger.log(method, msg)
        fileLogger.log(method, msg)
    },
    network: (method, data) => {
        consoleLogger.info({
            req_method: method,
            data: data
        })
        fileLogger.info({
            req_method: method,
            data: data
        })
    }
}

module.exports = logger