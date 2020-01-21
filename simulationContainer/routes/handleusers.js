var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");

/* GET handle users page */



// app.use(function (req, res, next) {

  // Website you wish to allow to connect
 // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
// });
router.get('/',function(req, res, next){
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');
    if(req.session.loggedin){
        res.render("handleusers");
    }else{
        res.redirect('/signin_manager');
    }
});


router.post('/visit', async function(req,res,next){
  console.log(req.body);
  console.log("--------------------------------------------------------------------------------------------------------------------------------");
  // console.log(res);
  //res.send();
  res.render('managerpage ');
});
 
router.post('/block', async function(req,res,next){
  console.log(req.body);
  res.send();
  res.send('/signin_manager');
});

module.exports = router;