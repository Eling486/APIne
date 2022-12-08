const jwt = require('jsonwebtoken');

const Validate = (tokenBase64) => {
    if(!tokenBase64){
        return {}
    }
    
    let token = Buffer.from(tokenBase64, 'base64').toString('utf-8');
    let payload = jwt.verify(token, 'APIne');

    return payload
}

module.exports = Validate