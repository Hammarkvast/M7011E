var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/getOwnerData', function (req, res, next) {
    var sql = "SELECT firstname, lastname, username FROM owners WHERE ownerid = " + db.escape(req.session.databaseid) + ";";
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })
});

router.get('/getAllOwners', function (req, res, next) {
    var sql = "SELECT username, ownerid FROM owners WHERE manager = 0";
    db.query(sql, function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })
})

//GET all owners.

router.get('/getUserData', function (req, res, next) {
    var d = new Date();
    var time = d.getTime()
    var sql0 = "UPDATE owners SET lasttime = " + db.escape(time) + " WHERE ownerid = " + db.escape(req.session.databaseid) + ";";
    db.query(sql0, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
    })
    var sql = "SELECT lastwindspeed, production, consumption, gridbatterypercentage, griddelta, battery, batteryMax FROM house WHERE ownerid = " + db.escape(req.session.databaseid) + ";";
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })

});

router.get('/getmanagerplantData', function (req, res, next) {
    var sql = "SELECT production, gridbufferpercentage, griddelta, buffer, bufferMax FROM powerplant;";
    //console.log("inside get manager plat data API ");
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        //console.log(" inside get manager plant data not error API")
        res.send(rows);
    })

});
router.get('/getElectricityPrice', function (req, res, next) {

    var sql = 'SELECT totalnetproduction, totalelectricityPrice, manorsim FROM totalelectricity;';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            });
        }
        res.send(rows);
    })
});
router.get('/getmanagerhandleusers', function (req, res, next) {
    var sql = 'SELECT ownerid, username, lasttime,blockedtime, secondsblocked FROM  owners WHERE manager = 0';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            console.log("error log js: " + err.log);
            console.log("error message js: " + err.message);
            res.status(500).send({
                error: 'Something failed!'
            });
        }
        res.json(rows);
    })
});

router.get('/getOwner', function (req, res, next) {
    var id = req.query.id;
    var sql = 'SELECT * FROM owners WHERE id = ?';
    db.query(sql, [id], function (err, row, fields) {
        if (err) {
            res.status(500).send({
                error: 'couldnt get specific owner'
            });
        }
        res.json(row)
    })
});

router.get('/getOwnerID', function (req, res, next) {
    var sql = 'SELECT id FROM owners';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'couldnt recieve ownerIDs'
            })
        }
        res.json(rows)
    })
});

router.get('/getHouseElectricity', function (req, res, next) {
    var id = req.query.id;
    var sql = 'SELECT * FROM house INNER JOIN owners ON house.houseid = owners.houseid WHERE house.houseid=' + id;
    db.query(sql, [id], function (err, row, fields) {
        if (err) {
            res.status(500).send({
                error: 'couldnt recieve house info'
            });
        }
        res.json(row)
    })
});

router.get('/getmanagerhandleuserblocked', function (req, res, next) {
    var id = req.query.id;
    var sql = 'SELECT blackout FROM house where ownerid != 2 ;'
    db.query(sql, [id], function (err, row, fields) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: 'couldnt recieve house info'
            });
        }
        res.json(row)
    })
});


router.get('/totalelectricity', function (req, res, next) {
    var sql = 'SELECT * FROM totalelectricity';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'couldnt get the total electricity consumption or production'
            });
        }
        res.json(rows);
    })
});

router.post('/addProductionConsumption', function (req, res, next) {
    var sql = 'INSERT INTO totalelectricity(totalconsumption, totalproduction) (SELECT SUM(consumption), SUM(production) FROM house)';
    db.query(sql, function (err, result) {
        if (err) {
            res.status(500).send({
                error: 'couldnt add production or consumption'
            });
        }
        res.json({
            'status': 'success'
        })
    })
});

router.get('/getVisitOwnerData', function (req, res, next) {
    var sql = "SELECT firstname, lastname, username FROM owners WHERE ownerid = " + db.escape(req.query.userid) + ";";
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })
});

//GET all owners.

router.get('/getVisitUserData', function (req, res, next) {
    id = req.query.userid;
    var sql = "SELECT lastwindspeed, production, consumption, gridbatterypercentage, griddelta, battery, batteryMax FROM house WHERE ownerid = " + db.escape(id) + ";";
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })

});

router.get('/getVisitElectricityPrice', function (req, res, next) {
    var sql = 'SELECT totalelectricityPrice FROM totalelectricity;';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            });
        }
        res.send(rows);
    })
});
router.get('/settoggle', function (req, res, next) {
    var sql = 'UPDATE totalelectricity SET manorsim =' + db.escape(req.query.toggle) + ' ;';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            });
        }
    })
});
router.get('/setprice', function (req, res, next) {
    var sql = 'UPDATE totalelectricity SET totalelectricityPrice =' + db.escape(req.query.price) + ' ;';
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            });
        }
    })
});
router.get('/getSlider', function (req, res, next) {
    console.log(req.session);
    id = req.session.databaseid;
    var sql = "SELECT gridbatterypercentage FROM house WHERE ownerid = " + db.escape(id) + ";";
    db.query(sql, async function (err, rows, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return err;
        }
        res.send(rows);
    })

});
module.exports = router;