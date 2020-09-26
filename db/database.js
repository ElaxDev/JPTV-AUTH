const mysql = require("mysql");
const { database } = require('./keys');
const { promisify } = require('util');

const connPool = mysql.createPool(database);

connPool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('THE CONNECTION WITH THE DATABASE HAS BEEN CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION HAS BEEN REFUSED');
        }
    }
    if(connection) {
        connection.release();
        console.log('Database is connected');
        return;
    }
});

connPool.query = promisify(connPool.query);

module.exports = connPool;
