var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

//GET the total consumption and production

router.get('/totalelectricity',function(req, res, next) {
    var sql = 'SELECT * FROM totalelectricity';
    db.query(sql, function(err, rows, fields){
        if(err){
            res.status(500).send({error: 'couldnt get the total electricity consumption or production'});
        }
        res.json(rows);
    })
});