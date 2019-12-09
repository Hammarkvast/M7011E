var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
console.log("jadajdada")
router.use(bodyParser.json());


//GET all owners.

router.get('/', function(req, res, next) {
      res.render('signup', {message: "signup.js"});
});

router.post('/', function(req,res,next){
    message = '';
    console.log("signupenetercehcl ")
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      console.log("post check");
      //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
 
      var sql = "INSERT INTO `antom`.`owners`(`username`,`password`,`houseid`) VALUES ('" + name + "','" + pass + "','"+ 1 +"')";
      var query = db.query(sql, function(err, result) { 
         if (err){
            console.log("ERROR but what");
            console.log("error log js: "+ err.log);
            console.log("error message js: " + err.message);

            message = err.message + err.log
            res.render('signup', {message: message}); 
         }
         message = "Succesfully! Your account has been created.";
         res.render('signup',{message: message});
      });
});
 
   


module.exports = router; 
