var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  interval  = 5000;
 // setInterval(() => {
    
    if (req.session.loggedin){
      var sql = "SELECT imgname, imgtype, image FROM house WHERE ownerid = '"+ req.session.databaseid+"';";
      var query = db.query(sql, function(err, result) { 
        if (err){
          console.log("ERROR but what");
        console.log("error log js: "+ err.log);
        console.log("error message js: " + err.message);
        message = err.message + err.log
        res.render('test', {message: message}); 
      }
      //console.log(result[0].image)
      //var buf = Buffer.from(result[0].image, 'base64');
      //  var imgurl = __dirname +"/../public/images/website/"+result[0].imgname+".png";
      var data = "data:" + result[0].imgtype + ";base64,"+result[0].image;
      //if (result[0].imgtype == 'image/png'){
          
      //fs.writeFileSync(imgurl, imgurl);
        //}
      res.render("test", {imageurl: data} );//, {
        
          //res.render("test", {message: percentage});
      });
    
    } else{
      console.log("redirext test test")
      res.redirect("/signin");
    }
  //}, interval);
});

// router.get('/signup', function(req, res, next) {
  // let message = "index.js";
  // res.render("signup", {message: message});yy
// });


router.post('/', function(req, res, next) {
  console.log("session loggedin: " + req.session.loggedin);
  
  console.log("session id: " + req.session.databaseid);
  if (req.session.loggedin){
    message = '';
    console.log("signupenetercehcl ")
    var post  = req.body;
    var slider= post.slider; 
    console.log("post check slider value = " + slider);
    var sql = "UPDATE antom.house SET gridbatterypercentage = "+ slider + " WHERE ownerid ="+req.session.databaseid+";";
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
    }
        //res.json({'status':'success'})
    });
  }
    res.render("test");
});


router.get('/owners/owner', function(req, res, next) {
   res.render("owner");
});



/*
//router.post('/',function(req,res){
  request("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/162860/period/latest-hour/data.json", function (error, response, body) {
     if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.value[0].value);
      }
  })
//})
*/
module.exports = router;
