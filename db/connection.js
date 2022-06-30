const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mysql username,
        user: 'root',
        // your mysql password,
        password: 'zaq12wsx',
        database: 'election'
    },
    console.log("connected to the eleciton database")
);

module.exports = db;