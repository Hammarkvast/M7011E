var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var upload = multer({
    dest: __dirname + '/../public/pictures'
});
const request = require("request");

/* GET manager page */

router.get('/', function (req, res, next) {
    if (req.session.loggedin && req.session.manager) {
        var sql = "SELECT imgname, imgtype, image FROM house WHERE ownerid = " + db.escape(req.session.databaseid) + ";";
        var query = db.query(sql, function (err, result) {
            if (err) {
                res.render('profile');
            }
            var data = "data:" + result[0].imgtype + ";base64," + result[0].image;
            res.render("profile", {
                imageurl: data
            });
        })
    } else {
        res.redirect('/signin_manager');
    }
});

router.post('/', upload.single('manager_profile'), function (req, res, next) {
    file = req.file;
    var fileType = req.file.mimetype;
    var fileName = req.file.filename;
    let buff = fs.readFileSync(file.path);
    let base64data = buff.toString('base64');
    var sql = 'UPDATE house SET imgname =' + db.escape(fileName) + ', imgtype = ' + db.escape(fileType) + ', image =' + db.escape(base64data) + 'WHERE houseid =' + db.escape(req.session.databaseid) + ';';
    db.query(sql, function (err) {
        if (err) {
            console.log("error detected: " + err);
            res.status(500).send({
                error: err
            });
        }
    });
    res.redirect("/profile");
});

router.post('/deleteOwner', function (req, res, next) {
    body = req.body;
    var id = body.usertable;
    var sql = 'DELETE owners, house FROM house INNER JOIN owners ON house.houseid = owners.ownerid WHERE house.houseid=' + id + ";";
    db.query(sql, [id], function (err, row, fields) {
        if (err) {
            res.status(500).send({
                error: 'couldnt delete the specific owner'
            });
        }
    });
    res.redirect("/profile");
});




module.exports = router;