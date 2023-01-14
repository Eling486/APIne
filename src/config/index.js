const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let config
if(!fs.existsSync('config.yml')){
    console.log(fs.writeFileSync('config.yml', ''))
}
let CONFIG_FILE = fs.readFileSync('config.yml', 'utf8')
let CONFIG_DEFAULT = yaml.load(fs.readFileSync('./src/config/default.yml', 'utf8'))

let configDecoded = yaml.load(CONFIG_FILE)

if (!configDecoded) {
    configDecoded = CONFIG_DEFAULT
}
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
let envList = ['production', 'development']

config = configDecoded[env]

// Set default settings
Object.keys(CONFIG_DEFAULT[env]).forEach(key => {
    if (!config[key]) {
        config[key] = CONFIG_DEFAULT[env][key]
    }
})

if(!config.db.core){
    config.db.core = 'mysql'
}

if(!config.db.db_name){
    config.db.db_name = 'database'
}

// db config complementation
if(!config.db[config.db.core] && CONFIG_DEFAULT[envList.splice(envList.indexOf(env), 1)[0]].db[config.db.core]){
    config.db[config.db.core] = CONFIG_DEFAULT[envList.splice(envList.indexOf(env), 1)[0]].db[config.db.core]
}

if(!CONFIG_DEFAULT[env].db[config.db.core]){
    config.db.core = 'mysql'
    config.db.db_name = 'database'
    config.db.mysql = CONFIG_DEFAULT[env].db.mysql
}

Object.keys(CONFIG_DEFAULT[env].db[config.db.core]).forEach(key => {
    if (!config.db[config.db.core][key]) {
        config.db[config.db.core][key] = CONFIG_DEFAULT[env].db[config.db.core][key]
    }
})

module.exports = config;