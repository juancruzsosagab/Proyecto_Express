const mysql = require('mysql2/promise');
module.exports.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'php_carrito',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});// query database
