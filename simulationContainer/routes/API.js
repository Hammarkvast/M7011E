var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/getOwnerData', function(req, res, next){
    var sql = "SELECT firstname, lastname, username FROM owners WHERE ownerid = " + db.escape(req.session.databaseid) + ";";
    db.query(sql, async function(err, rows, result){
        if(err){
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })
});

router.get('/getAllOwners', function(req,res,next){
    var sql = "SELECT username, ownerid FROM owners WHERE manager IS NULL";
    db.query(sql, function(err, rows, result){
        if(err){
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        console.log(rows);
        res.send(rows);
    })
})

//GET all owners.

router.get('/getUserData', function(req, res, next) {
    var sql = "SELECT lastwindspeed, production, consumption, gridbatterypercentage, griddelta, battery, batteryMax FROM house WHERE ownerid = "+ db.escape(req.session.databaseid)+";";
    db.query(sql, async function(err,rows,result){
    if (err){
        console.log(err);
        res.sendStatus(500);
        return err;
    }
    // let battery =  result[0].battery;
    // let batterymax =  result[0].batteryMax;
    // let percentage = battery / batterymax;
    // percentage = percentage * 100;
    
    // let test =  {
    // percentage: percentage,
    // production: result[0].production,
    // consumption: result[0].consumption,
    // gridbatterypercentage: result[0].gridbatterypercentage,
    // windspeed: result[0].lastwindspeed,
    // netproduction: result[0].griddelta,
    // electricityprice: 5,
    // battery: result[0].battery,
    // };
    // res.json(rows);
    res.send(rows);
    })

});

router.get('/getElectricityPrice', function(req, res, next) {
     //var id = req.param.id;
    // console.log("enter check owner")
    // res.render('owner.ejs');
    var sql = 'SELECT totalelectricityPrice FROM totalelectricity;';
    //res.status(200);
    db.query(sql, function(err, rows, fields){
        if(err) {
            res.status(500).send({error: 'Something failed!'});
        }
        res.send(rows);
    })
});
router.get('/getmanagerhandleusers', function(req, res, next) {
     //var id = req.param.id;
    // console.log("enter check owner")
    // res.render('owner.ejs');
    var sql = 'SELECT ownerid, username, UNIX_TIMESTAMP(lasttime),blockedtime, secondsblocked FROM  owners';
    //res.status(200);
    db.query(sql, function(err, rows, fields){
        if(err) {
            console.log("error log js: "+ err.log);
            console.log("error message js: " + err.message);
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

router.get('/getmanagerhandleuserblocked', function(req, res, next){
    var id = req.query.id;
    var sql = 'SELECT blackout FROM house;'
    db.query(sql, [id], function(err, row, fields){
        if(err){
            console.log(err);
            res.status(500).send({error: 'couldnt recieve house info'});
        }
        res.json(row)
    })
});

// router.delete('/deleteOwner', function(req, res, next) {
//     var id = req.param.id;
//     var sql = 'DELETE * FROM house INNER JOIN owners ON house.houseid = owners.houseid WHERE house.houseid='+id;
//     db.query(sql, [id], function(err, row, fields) {
//         if(err){
//             res.status(500).send({error: 'couldnt delete the specific owner'});
//         }
//         res.json(row)
//     })
// });




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

router.get('/getVisitOwnerData', function(req, res, next){
    var sql = "SELECT firstname, lastname, username FROM owners WHERE ownerid = " + db.escape(req.query.userid) + ";";
    db.query(sql, async function(err, rows, result){
        if(err){
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })
});

//GET all owners.

router.get('/getVisitUserData', function(req, res, next) {
    console.log(req.query.userid);
    id = req.query.userid;
    var sql = "SELECT lastwindspeed, production, consumption, gridbatterypercentage, griddelta, battery, batteryMax FROM house WHERE ownerid = "+ db.escape(id)+";";
    db.query(sql, async function(err,rows,result){
    if (err){
        console.log(err);
        res.sendStatus(500);
        return err;
    }
    res.send(rows);
    })

});

router.get('/getVisitElectricityPrice', function(req, res, next) {
    //console.log(req);
    var sql = 'SELECT totalelectricityPrice FROM totalelectricity;';
   // res.status(200);
    db.query(sql, function(err, rows, fields){
        if(err) {
            res.status(500).send({error: 'Something failed!'});
        }
        res.send({rows});
    })
});
module.exports = router;