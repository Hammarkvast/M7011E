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

router.post('/toggle', function(req, res, next) {
    // console.log("toggle Enter check");
  if (req.session.loggedin){
    var post  = req.body;
    // console.log(post);
    var tog= post.optradio;
    //console.log(toggle)
    // console.log("HHHHHHEEEEEERRRRRRREEEEEE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<") 
     var sql = 'UPDATE totalelectricity SET manorsim =' + db.escape(tog)+' ;';
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
    }
       // res.json({'status':'success'})
    });
    res.redirect("/managerhome");
  }
    res.redirect('/signin_manager');
});
router.post('/price', function(req, res, next) {
  if (req.session.loggedin){
    var post  = req.body;
    var price= post.elprinput;
    // console.log(post);
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    var sql = 'SELECT manorsim from totalelectricity ';
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            result.sendStatus(500);
         }
        //res.json({'status':'success'})
        if (result[0].manorsim == 0 && price != "aosivna"){
            var sql2 = 'UPDATE totalelectricity SET totalelectricityPrice =' + db.escape(price)+';';
            db.query(sql2, function(err, result){
                if (err){
                    console.log(err);
                    result.sendStatus(500);
                }
                //res.json({'status':'success'})
            });
        }
    });
   res.redirect("/managerhome");
  }

   res.redirect("/signin_manager");
});

router.post('/onoroff', function(req, res, next) {
    // console.log("toggle Enter check");
  if (req.session.loggedin){
    var post  = req.body;
    var d = new Date();
    var time = d.getTime();

    // console.log(post);
    var tog= post.optradio;
    //console.log(toggle)
    // console.log("HHHHHHEEEEEERRRRRRREEEEEE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<") 
     var sql = 'UPDATE powerplant SET onoroff = ' + db.escape(tog)+ ", changestatetime = " + db.escape(time)+'where onoroff !='+db.escape(tog)+' ;';
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
        }
       // res.json({'status':'success'})
    });
    res.redirect("/managerhome");   
  }
    res.redirect('/signin_manager');
});
module.exports = router;
