let mongoose = require('mongoose');
let config = require('./config')

class Database {
    constructor() {
        this._connect()
    }
    
    _connect() {
        mongoose.set('useCreateIndex', true);
        mongoose.connect(config.databaseURL, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.log('Database connection error')
            })
    }
}

module.exports = new Database()