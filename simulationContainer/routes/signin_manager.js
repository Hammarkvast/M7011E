var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
    res.render('signin_manager', {
        message: ""
    });
});

router.post('/', function (req, res, next) {
    message = '';
    var post = req.body;
    var name = post.username;
    var pass = post.password;
    if (name) {
        var sql = "SELECT * FROM owners WHERE username = " + db.escape(name) + " AND manager = 1;";
        var query = db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                message = err.message + err.log;
                res.render('signin_manager', {
                    message: message
                });
            }
            console.log(result[0]);
            if (result[0] !== undefined) {
                bcrypt.compare(pass, result[0].password, function (err, compares) {
                    if (compares == true) {
                        req.session.loggedin = true;
                        req.session.username = name;
                        req.session.manager = true;
                        req.session.databaseid = result[0].ownerid;
                        res.redirect('/managerhome');
                    } else {
                        message = "Wrong username, manager, or you dont have the rights to access this page";
                        res.render('signin_manager', {
                            message: message
                        });
                    }
                });
            } else {
                message = "You dont have access to this page!";
                res.render('signin_manager', {
                    message: message
                });
            }

        });
    } else {
        message = "Wrong username, manager, or you dont have the rights to access this page";
        res.render('signin_manager', {
            message: message
        });
    }
});
module.exports = router;