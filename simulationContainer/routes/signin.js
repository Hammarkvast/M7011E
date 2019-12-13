var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
console.log("jadajdada")
router.use(bodyParser.json());


//GET all owners.

router.get('/', function(req, res, next) {
      res.render('signin', {message: "signin.js"});
});

router.post('/', function(req,res,next){
    message = '';
    console.log("signupenetercehcl ")
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
      console.log("post check");
      //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
 
      var sql = "SELECT * FROM owners WHERE username = '"+ name + "' AND password = '" + pass +"';";
      var query = db.query(sql, function(err, result) { 
         if (err){
            console.log("ERROR but what");
            console.log("error log js: "+ err.log);
            console.log("error message js: " + err.message);

            message = err.message + err.log
            res.render('signin', {message: message}); 
         }
         if (result.length > 0){
            req.session.loggedin = true;
            req.session.username = name;
            req.session.databaseid = result[0].ownerid;
            res.redirect("/");
         } else {
				res.send('Incorrect Username and/or Password!');
			}

         message = "Succesfully! Your account has been created.";
         res.render('signin',{message: message});
      });
});
 
   


module.exports = router; 
