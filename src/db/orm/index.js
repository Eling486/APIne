const logger = require('../../logger')

class orm {
    constructor(core, database) {
        this.core = require(`../${core}`)
        this.database = database
        this.db = new this.core(this.database)
        this.sql = this.db.sql
        this.createORM()
    }

    createORM() {
        this.orm = {}
        this.sql('SHOW TABLES').then(tables => {
            if(tables.err){
                logger.error(tables.err.sqlMessage)
                return
            }
            if (tables.data) {
                this.orm.tables = []
                let key = `Tables_in_${this.database}`
                for(let i in tables.data){
                    this.orm.tables.push(tables.data[i][key])
                }
            }
        })
    }

    existsTable(tableName) {
        return new Promise(async (resolve) => {
            this.sql(`SELECT * FROM ${tableName}`).then(result => {
                if (result.err) {
                    if(result.err.errno == 1146){
                        return resolve(false)
                    }
                    return resolve(undefined)
                }
                return resolve(true)
            })
        })
    }

    existsField(tableName, field) {
        return new Promise(async (resolve) => {
            this.existsTable(tableName).then(async (exists) => {
                if (exists === undefined) {
                    return resolve(undefined)
                }
                if (!exists) {
                    return resolve(false)
                }
                this.sql(`DESC ${tableName}`).then(result => {
                    if(result.err){
                        return resolve(undefined)
                    }
                    if (!result.data) {
                        return resolve(false)
                    }
                    let is_exists = false
                    for (let i in result.data) {
                        if (result.data[i].Field == field) {
                            is_exists = true
                        }
                    }
                    if (is_exists) {
                        return resolve(true)
                    }
                    return resolve(false)
                })
            })
        })
    }
}

module.exports = orm;