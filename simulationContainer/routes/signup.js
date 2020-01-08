var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
console.log("jadajdada")
router.use(bodyParser.json());
var bcrypt = require('bcrypt');


//GET all owners.

router.get('/', function(req, res, next) {
      res.render('signup', {message: "signup.js"});
});

router.post('/', async function(req,res,next){
   message = '';
    console.log("signupenetercehcl ")
   var post  = req.body;
   var name= post.username;
   var pass= post.password;
   var fname= post.firstname;
   var lname= post.lastname;
   var emial= post.email;
   console.log("post check");
   await bcrypt.hash(pass, 10, async function(err, hash) {
      var sql = "INSERT INTO `antom`.`owners`(`firstname`,`lastname`,`email`,`username`,`password`) VALUES  ('" + fname + "','" + lname + "','" + emial + "','" + name + "','" + hash + "')";
      // Store hash in database
      //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
      console.log("BCRYPT ENTER CHECK ");
      var query = await db.query(sql, async function(err, result) { 
         if (err){
            console.log("ERROR but what");
            console.log("error log js: "+ err.log);
            console.log("error message js: " + err.message);
            
            message = err.message + err.log
            await res.render('signup', {message: message}); 
         }
         console.log("FIRST QUERY DONE!!!!!! ");
      });

      console.log("username = " + name)
      var sql2 = "SELECT ownerid FROM owners WHERE username = '" + name + "';"
      query = await db.query(sql2, async function(err2, result2){
         
         if (err2){
            console.log("ERROR but what2");
            console.log("error log js: "+ err2.log);
            console.log("error message js: " + err2.message);

             message = err2.message + err2.log
            await res.render('signup', {message: message}); 
         }
         console.log(result2);
         console.log("reult: " + result2[0].ownerid);
         console.log("reult2: " + result2.ownerid);

         var sql3 = "INSERT INTO `house` (`ownerid`,`longitude`, `latitude`, `lastwindspeed`, `meanwind`, `stddevwind`,`broken`, `brokencount`, `brokenprobability`, `productionefficiency`,`production`,`meanconsumption`, `stddevconsumption`, `consumption`, `griddelta`,`gridbatterypercentage`, `batteryMax`, `battery`)" 
         sql3 = sql3 + " VALUES (" + result2[0].ownerid + ", 65.373, 22.811, 3.5, 6, 0.05, 0, 0, 0.05, 8, 55.3, 50, 0.8, 54.55, 0, 50.0, 200,100.0);"
         console.log(sql3);
         query = await db.query(sql3, async function(err3, result3){
         
            if (err3){
               console.log("ERROR but what3");
               console.log("error log js: "+ err3.log);
               console.log("error message js: " + err3.message);  
            
               message = err3.message + err3.log
               res.render('signup', {message: message}); 
            }
         
            message = "Succesfully! Your account has been created.";
            await res.render('signup',{message: message});
         });
      });
   }) 
});
 
   


module.exports = router; 
