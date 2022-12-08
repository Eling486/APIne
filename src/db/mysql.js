const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 11073,
    timezone: "08:00"
}

class DB {
    constructor(database) {
        this.database = database;
        this.config = config;
        this.config.database = database
        this.pool = null
        this.mysql = mysql
        this.createPool()
        return this
    }

    createPool(){
        if(this.pool){
            this.pool.end()
        }
        this.pool = mysql.createPool(this.config)
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