const { getMsg } = require("./utils")

const response = {
    /**
     * 请求返回JSON
     * @param {*} res 
     * @param {Number} code 
     * @param {String} msg 
     * @param {*} data 
     */
    sendJSON: (data) => {
        if(data.res.headersSent){
            return
        }
        if(!data.code && data.code !== 0){
            data.code = -500
        }
        let lang = null
        if(data.req && data.req.query.lang){
            lang = data.req.query.lang
        }
        let json = {
            code: data.code
        }
        if (!data['msg']) {
            data.msg = getMsg(data.code, lang);
        }
        json['msg'] = data.msg
        if (data['data']) {
            json['data'] = data.data
        }
        return data.res.json(json)
    },
}

module.exports = response;