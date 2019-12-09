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
            res.status(500).send({error: 'couldnt recieve mean wind'});
        }
        res.json(row)
    })
});

router.put('/updatelastwind', function(req, res, next){
    var id = req.query.id;
    var lastwindspeed = req.body.lastwindspeed;
    var sql = "'UPDATE house SET lastwindspeed = '"+lastwindspeed + "' WHERE houseid = ?'";
    db.query(sql, function(err, result){
        if (err){
            res.status(500).send({error: 'couldnt update wind speed'});
        }
        res.json({'status':'success'})
    })
});

module.exports = router;