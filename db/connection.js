const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // your mysql username,
        user: 'root',
        // your mysql password,
        password: 'zaq12wsx',
        database: 'company'
    },
    console.log("Connected to the company employee database")
);

module.exports = db;