const orm = require('./orm')

dbName = 'database'

const db = new orm('mysql', dbName)

module.exports = db;