var mysql = requre('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'testapp' 
    });

connection.connect(function(err) {
    if(err) throw err
    console.log("Connected!");
});

module.exports = connection;