const statusList = require('./status')
const DEFAULT_LANG = 'zh_cn'

const utils = {
    getMsg: (code, lang = DEFAULT_LANG) => {
        if(code === 0 ) {
            return 'ok'
        }

        if(!lang){
            lang = DEFAULT_LANG
        }

        lang = lang.toLowerCase()

        let codeMain = code
        let isDetail = false
        let msg
        if(code < -1000){
            codeMain = parseInt(code / 100)
            isDetail = true
        }

        for(let status of statusList) {
            if(status.code == codeMain) {
                if(!isDetail){
                    if(!status.msg[lang]){
                        lang = DEFAULT_LANG
                    }
                    msg = status.msg[lang]
                    break;
                }
                for(let detail of status.children) {
                    if(detail.code == code) {
                        if(!detail.msg[lang]){
                            lang = DEFAULT_LANG
                        }
                        msg = detail.msg[lang]
                        break;
                    }
                }
                break;
            }
        }
        if(!msg){
            msg = 'Error'
        }
        return msg
    }
}

module.exports = utils