var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
console.log("jadajdada")
router.use(bodyParser.json());


//GET all owners.

router.get('/', function(req, res, next) {
     //var id = req.param.id;
    // console.log("enter check owner")
    // res.render('owner.ejs');
    var sql = 'SELECT * FROM  owners';
    //res.status(200);
    db.query(sql, function(err, rows, fields){
        if(err) {
            res.status(500).send({error: 'Something failed!'});
        }
        res.json(rows);
    })
});

router.get('/getOwner', function(req, res, next){
    var id = req.query.id;
    var sql = 'SELECT * FROM owners WHERE id = ?';
    db.query(sql,[id], function (err, row, fields) {
        if(err) {
            res.status(500).send({error: 'couldnt get specific owner'});
        }
        res.json(row)
    })
});

router.get('/getOwnerID', function(req, res, next){
    var sql = 'SELECT id FROM owners';
    db.query(sql, function (err, rows, fields){
        if(err) {
            res.status(500).send({error: 'couldnt recieve ownerIDs'})
        }
        res.json(rows)
    })
});

router.get('/getHouseElectricity', function(req, res, next){
    var id = req.query.id;
    var sql = 'SELECT * FROM house INNER JOIN owners ON house.houseid = owners.houseid WHERE house.houseid='+id;
    db.query(sql, [id], function(err, row, fields){
        if(err){
            res.status(500).send({error: 'couldnt recieve house info'});
        }
        res.json(row)
    })
});


router.delete('/deleteOwner', function(req, res, next) {
    var id = req.param.id;
    var sql = 'DELETE * FROM house INNER JOIN owners ON house.houseid = owners.houseid WHERE house.houseid='+id;
    db.query(sql, [id], function(err, row, fields) {
        if(err){
            res.status(500).send({error: 'couldnt delete the specific owner'});
        }
        res.json(row)
    })
});




router.get('/totalelectricity',function(req, res, next) {
    var sql = 'SELECT * FROM totalelectricity';
    db.query(sql, function(err, rows, fields){
        if(err){
            res.status(500).send({error: 'couldnt get the total electricity consumption or production'});
        }
        res.json(rows);
    })
});

router.post('/addProductionConsumption', function(req, res, next){
    var sql = 'INSERT INTO totalelectricity(totalconsumption, totalproduction) (SELECT SUM(consumption), SUM(production) FROM house)';
    db.query(sql, function(err, result){
        if(err){
            res.status(500).send({error: 'couldnt add production or consumption'});
        }
        res.json({'status':'success'})
    })
});

module.exports = router;