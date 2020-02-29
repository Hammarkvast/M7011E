var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");

/* GET manager page */

router.get('/', function(req, res, next){
    if(req.session.loggedin){
        res.render("profile");
    }else{
        res.redirect('/signin_manager');
    }
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
    res.render("profile");
});


module.exports = router;