var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");

/* GET manager page */

router.get('/', function(req, res, next){
    if(req.session.loggedin && req.session.manager){
        var sql = "SELECT imgname, imgtype, image FROM house WHERE ownerid = "+ db.escape(req.session.databaseid)+";";  
        var query = db.query(sql, function(err, result){
            if(err){
                res.render('managerpage');
            }
            var data = "data:" + result[0].imgtype + ";base64," + result[0].image;
            res.render("managerpage", {imageurl:data});
        })  
    }else{
        res.redirect('/signin_manager');
    }
});


router.post('/', function(req, res, next) {
  if (req.session.loggedin){
    message = '';
    var post  = req.body;
    var slider= post.slider; 
    console.log("post check slider value = " + slider);
    var sql = "UPDATE antom.powerplant SET gridbufferpercentage = "+ db.escape(slider)+";";
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
    }
        //res.json({'status':'success'})
    });
  }
    res.redirect("/managerhome");
});


module.exports = router;
