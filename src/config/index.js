const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let config
let CONFIG_FILE = fs.readFileSync('config.yml', 'utf8')
let CONFIG_DEFAULT = yaml.load(fs.readFileSync('./src/config/default.yml', 'utf8'))

let configDecoded = yaml.load(CONFIG_FILE)

if (!configDecoded.production && !configDecoded.development) {
    configDecoded = CONFIG_DEFAULT
}
if (!configDecoded.production) {
    configDecoded = configDecoded.development
}
if (!configDecoded.development) {
    configDecoded = configDecoded.production
}

let env = process.env.NODE_ENV || 'development'

config = configDecoded[env]

// Set default settings
Object.keys(CONFIG_DEFAULT[env]).forEach(key => {
    if (!config[key]) {
        config[key] = CONFIG_DEFAULT[env][key]
    }
})

module.exports = config;