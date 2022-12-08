const winston = require('winston');
const format = winston.format
const colorizer = winston.format.colorize();

const consoleFormat = format.printf((info) => {
    let level = colorizer.colorize(info.level, info.level.toUpperCase())
    if(info.message.req_method){
        if(info.message.req_method === 'GET'){
            level = colorizer.colorize('info', 'GET')
        }
        if(info.message.req_method === 'POST'){
            level = colorizer.colorize('warn', 'POST')
        }
        let statusCodeColorized = statusCodeColorizer(info.message.data.status_code)
        let codeColorized = codeColorizer(info.message.data.code)
        return `[${level}] ${info.timestamp} ${info.message.data.ip}: ${info.message.data.url} ${statusCodeColorized} | ${codeColorized} ${info.message.data.msg}`
    }
    if(info.level == 'error'){
        return colorizer.colorize('error', `[${level}] ${info.timestamp}: ${info.message}`)
    }
    return `[${level}] ${info.timestamp}: ${info.message}`
})

function statusCodeColorizer(status_code){
    if(status_code < 300){
        return colorizer.colorize('info', status_code)
    }
    if(status_code < 400){
        return colorizer.colorize('warn', status_code)
    }
    return colorizer.colorize('error', status_code)
}

function codeColorizer(code){
    if(code < 0){
        return colorizer.colorize('error', code)
    }
    return colorizer.colorize('info', code)
}

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:MM:SS"
        }),
        consoleFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
})


module.exports = logger