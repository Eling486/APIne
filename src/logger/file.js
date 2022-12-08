const path = require('path');
const winston = require('winston');
const format = winston.format
const DailyRotateFile = require('winston-daily-rotate-file');

const fileFormat = format.printf((info) => {
    if(info.message.req_method){
        let level = info.message.req_method
        return `[${level}] ${info.timestamp} ${info.message.data.ip}: ${info.message.data.host}${info.message.data.url} ${JSON.stringify(info.message.data.body)} ${JSON.stringify(info.message.data.user_agent)} | ${info.message.data.code} ${info.message.data.msg}`
    }
    return `[${info.level.toUpperCase()}] ${info.timestamp}: ${info.message}`
})

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:MM:SS"
        }),
        fileFormat
    ),
    transports: [
        new DailyRotateFile({
            filename: path.join('logs', `%DATE%.log`),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '60d',
            prepend: true,
            json: false,
        }),
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error'
        })
    ]
})

module.exports = logger