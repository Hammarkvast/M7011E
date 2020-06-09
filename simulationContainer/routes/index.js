var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: __dirname + '/../public/pictures'});

/* GET home page. */
router.get('/', function(req, res, next) {
  interval  = 5000;
 // setInterval(() => {
    
    if (req.session.loggedin && !req.session.manager){
      var sql = "SELECT imgname, imgtype, image FROM house WHERE ownerid = "+ db.escape(req.session.databaseid)+";";
      var query = db.query(sql, function(err, result) { 
        if (err){
        console.log("error log js: "+ err.log);
        console.log("error message js: " + err.message);
        message = err.message + err.log
        res.render('mainpage', {message: message}); 
      }
      //console.log(result[0].image)
      //var buf = Buffer.from(result[0].image, 'base64');
      //  var imgurl = __dirname +"/../public/images/website/"+result[0].imgname+".png";
      var data = "data:" + result[0].imgtype + ";base64,"+result[0].image;
      //if (result[0].imgtype == 'image/png'){
          
      //fs.writeFileSync(imgurl, imgurl);
        //}
      res.render("mainpage", {imageurl: data} );//, {
        
          //res.render("test", {message: percentage});
      });
    
    } else{
      res.redirect("/signin");
    }
  //}, interval);
});

// router.get('/signup', function(req, res, next) {
  // let message = "index.js";
  // res.render("signup", {message: message});yy
// });


router.post('/', function(req, res, next) {
  if (req.session.loggedin && !req.session.manager){
    message = '';
    var post  = req.body;
    var slider= post.slider; 
    var sql = "UPDATE antom.house SET gridbatterypercentage = "+ db.escape(slider) + " WHERE ownerid ="+db.escape(req.session.databaseid)+";";
    console.log(sql);
    db.query(sql, function(err, result){
        if (err){
            console.log(err);
            res.sendStatus(500);
            return;
    }
        //res.json({'status':'success'})
    });
  }
    res.redirect("/");
});



router.post('/picture', upload.single('house_img'), function(req, res, next){
    console.log("Testing 123");
    if (req.session.loggedin && !req.session.manager){
      // console.log(req.file);
      file = req.file;
      //res.send("testing 123");
      var fileType = req.file.mimetype;
      var fileName = req.file.filename;
      //var id = req.body.id;
      let buff = fs.readFileSync(file.path);
      let base64data = buff.toString('base64');
      //console.log(filetype);
      //console.log(fileName);
      //console.log(base64data);
      var sql = 'UPDATE house SET imgname =' + db.escape(fileName) + ', imgtype = ' + db.escape(fileType) + ', image =' + db.escape(base64data) + 'WHERE houseid =' + db.escape(req.session.databaseid) + ';';
      db.query(sql, function (err){
          if(err){
              console.log("error detected: " + err);
              res.status(500).send({error: err});
          }
      });
      res.redirect("/");
  }
  res.redirect("/signin");

});


router.get('/API/owner', function(req, res, next) {
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
