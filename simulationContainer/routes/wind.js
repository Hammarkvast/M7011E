var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
//console.log("jadajdada")
router.use(bodyParser.json());

router.get('/gewinddata', function(req, res, next){
    var id = req.query.id;
    var sql = 'SELECT lastwindspeed, meanwind, stddevwind FROM house WHERE houseid = ?';
    db.query(sql, [id], function(err, row, fields){
        if(err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(row)
    })
});

router.put('/updatelastwind', function(req, res, next){
    var id = req.body.id;
    var lastwindspeed = req.body.lws;
    console.log("req body: "+ req.body);
    var sql = "UPDATE antom.house SET lastwindspeed = "+ lastwindspeed + " WHERE houseid ="+id+";";
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json({'status':'success'})
    })
});

module.exports = router;