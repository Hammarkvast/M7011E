var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function(req, res, next) {
    var id = req.param.id;
    var sql = 'SELECT * FROM  owner WHERE id=${id}';
    db.query(sql, function(err, row, fields){
        if(err) {
            res.status(500).send({error: 'Something failed!'});
        }
        res.json(row[0])
    })
});