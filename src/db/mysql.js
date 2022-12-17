const mysql = require('mysql');
const logger = require('../logger')

const core = global.config.db.core

const config = {
    host: global.config.db[core].host,
    user: global.config.db[core].user,
    password: global.config.db[core].password,
    port: global.config.db[core].port,
    timezone: global.config.db[core].timezone,
    database: global.config.db.db_name
}

class DB {
    constructor(database) {
        this.config = config;
        this.pool = null
        this.mysql = mysql
        this.createPool()
    }

    createPool(){
        if(this.pool){
            this.pool.end()
        }
        this.pool = mysql.createPool(this.config)
        this.pool.getConnection(function (err, connection) {
            if (err) {
                logger.error(err.sqlMessage)
                return false
            }
            connection.release();
            return true
        })
    }

    query(sql) {
        return new Promise((resolve) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    resolve({err, data: null});
                } else {
                    connection.query(sql, function (err, data) {
                        resolve({err, data});
                    });
                    connection.release();
                }
            })
        })
    }

    sql(sql, values = []) {
        return new Promise(async (resolve) => {
            let result = await this.db.query({
                sql: sql,
                values: values,
                timeout: 40000,
            })
            return resolve(result)
        })
    }
}

module.exports = DB;