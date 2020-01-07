var mysql = require('mysql');
var dotenv  = require('dotenv').config();
var connection = mysql.createConnection({
    port: 3308,
    host : process.env.DB_HOST,
    user :  process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE 
    });

connection.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected!");
});

module.exports = connection;