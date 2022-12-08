const Login = require('./login')
const Validate = require('./validate')

const user = {
    login: Login,
    validate: Validate,
    state: null,
    permit: null
}

module.exports = user