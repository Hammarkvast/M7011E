var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3308,
    host : 'localhost',
    user : 'root',
    password : 'jada',
    database : 'antom' 
    });

connection.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("Connected!");
});

module.exports = connection;