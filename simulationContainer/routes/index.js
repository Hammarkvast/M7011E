var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin){
    var sql = "SELECT battery, batteryMax FROM house WHERE ownerid = '"+ req.session.databaseid+"';";
    var query = db.query(sql, function(err, result) { 
      if (err){
        console.log("ERROR but what");
        console.log("error log js: "+ err.log);
        console.log("error message js: " + err.message);
        
        message = err.message + err.log
        res.render('test', {message: message}); 
      }
      let precentage = result[0].battery / result[0].batterymax;
      precentage = precentage * 100;
      //res.render("test", {message: percentage});
      res.render("test", {message: 20});
			//response.send(percentage);
      });

  } else{
    console.log("redirext test test")
    res.redirect("/signin");
  }
});

// router.get('/signup', function(req, res, next) {
  // let message = "index.js";
  // res.render("signup", {message: message});
// });



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
