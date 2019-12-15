var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");
/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin){
    var sql = "SELECT lastwindspeed, production, consumption, gridbatterypercentage, griddelta, battery, batteryMax FROM house WHERE ownerid = '"+ req.session.databaseid+"';";
    var query = db.query(sql, function(err, result) { 
      if (err){
        console.log("ERROR but what");
        console.log("error log js: "+ err.log);
        console.log("error message js: " + err.message);
        
        message = err.message + err.log
        res.render('test', {message: message}); 
      }
      let battery =  result[0].battery;
      let batterymax =  result[0].batteryMax;
      let percentage = battery / batterymax;
      percentage = percentage * 100;

      console.log("battery: "+ batterymax  + "  batterymax: " + batterymax+ "  precentage: " + percentage)
      
      //res.render("test", {message: percentage});
      res.render("test", {
        percentage: percentage,
        production: result[0].production,
        consumption: result[0].consumption,
        gridbatterypercentage: result[0].gridbatterypercentage,
        windspeed: result[0].lastwindspeed,
        netproduction: result[0].griddelta,
        electricityprice: 5,
        battery: result[0].battery,
      });
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
