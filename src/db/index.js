const mysql = require('./mysql')

dbName = 'database'

/**
 * ORM (Removed)
 */
// const orm = require('./orm')
// const db = new orm('mysql', dbName)

const db = new mysql(dbName)

module.exports = db;