const jwt = require('jsonwebtoken');

const Login = (username, password) => {
    let payload = {
        username: username,
        admin: true
    }
    let token = jwt.sign(payload, 'APIne');
    // let token = jwt.sign(payload, privateKey, { algorithm: 'RS256' }
    let tokenBase64 = Buffer.from(token, 'utf-8').toString('base64');

    return tokenBase64
}

module.exports = Login