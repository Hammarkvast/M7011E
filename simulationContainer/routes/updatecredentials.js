var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
//console.log("jadajdada")
router.use(bodyParser.json());
var bcrypt = require('bcrypt');
var fs = require('fs');

router.get('/', function(req, res, next){
    if(req.session.loggedin && req.session.manager){
        res.render("updatecredentials");
    }else{
        res.redirect('/signin_manager');
    }
});

router.post('/', async function(req, res, next){
    message = '';
    var post = req.body;
    var oldpass = post.oldpass;
    var newpass = post.newpass;
    var sql = "SELECT * FROM owners WHERE ownerid = '" + req.session.databaseid + "';";
    var query = db.query(sql, async function(err, result){
        if(err){
            message = err.message + err.log;
            res.render('updatecredentials', {message: message});
        }
        bcrypt.compare(oldpass, result[0].password, async function(err, compares){
            if(compares == true){
                await bcrypt.hash(newpass, 10, async function(err, hash){
                    sql = "UPDATE owners SET password = '" + hash +"' WHERE ownerid = '" + req.session.databaseid + "';";
                    query = await db.query(sql, async function(err, result2){
                        if (err){
                            message = "Cannot update password at this time";
                            res.render('updatecredentials', {message: message});
                        }
                        res.redirect('/profile');
                    });
                })
            }
        })
    });

    
});

module.exports = router;