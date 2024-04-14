const {config} = require('dotenv')
config()

module.exports = {
    db: {
        type: process.env.TYPE_DB,
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DB_NAME
    }
}