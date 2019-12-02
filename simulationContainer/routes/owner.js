var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());


//GET all owners.

router.get('/owner', function(req, res, next) {
    var id = req.param.id;
    var sql = 'SELECT * FROM  owners';
    db.query(sql, function(err, row, fields){
        if(err) {
            res.status(500).send({error: 'Something failed!'});
        }
        res.json(row[0])
    })
});

router.get('/owner', function(req, res, next){
    var id = req.param.id;
    var sql = 'SELECT * FROM owners WHERE id = ?'
    db.query(sql, userID, function (err, row, fields) {
        if(err) {
            res.status(500).send({error: 'couldnt get specific owner'});
        }
        res.json(row[0])
    })
});
