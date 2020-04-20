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
  
  if (req.session.loggedin){
    body = req.body;
    id = body.hidden1;
    var sql = "SELECT imgname, imgtype, image FROM house WHERE ownerid = "+ db.escape(id)+";";
    var query = db.query(sql, function(err, result) { 
      if (err){
      console.log("error log js: "+ err.log);
      console.log("error message js: " + err.message);
      message = err.message + err.log
      res.render('visituser', {message: message, userid: id}); 
    }
    var data = "data:" + result[0].imgtype + ";base64,"+result[0].image;
        
    res.render('visituser', {imageurl: data, userid: id});
    });
  
  } else{
    res.redirect("/signin");
  }
});
 
router.post('/block', async function(req,res,next){
  if (req.session.loggedin){
    body = req.body;
    id = body.hidden_block;
    console.log(id);
    res.render('block',{userid: id});

  }
});

router.post('/block/blocked', async function (req, res,next){
  console.log("testing if i can post in a post");
   if (req.session.loggedin){
      body = req.body;
      var id = body.Id;
      console.log(id);
      console.log(body);
      var seconds = body.slider;
      var d = new Date();
      var time = d.getTime();
      var sql = "UPDATE antom.owners SET blockedtime = " +db.escape(time)+", secondsblocked = " + db.escape(seconds)+" where ownerid = "+db.escape(id)+";"
      console.log(sql);
      db.query(sql,function(err,result){
        if (err){
          console.log(err);
          res.sendStatus(500);
          return err;
        }
      });
      res.redirect("/handleusers");
   }else{
     res.redirect("/signin");
   }
});

module.exports = router;