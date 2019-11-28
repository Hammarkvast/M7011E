var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3308,
    host : 'localhost',
    user : 'root',
    password : 'jada',
    database : 'antom' 
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_DATABASE
    });

connection.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected!");
});

module.exports = connection;