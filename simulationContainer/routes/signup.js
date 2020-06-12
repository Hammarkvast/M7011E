var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var bcrypt = require('bcrypt');
var fs = require('fs');
var multer = require('multer');
var upload = multer({
   dest: __dirname + '/../public/pictures'
});

//GET all owners.

router.get('/', function (req, res, next) {
   res.render('signup', {
      message: ""
   });
});

router.post('/', upload.single('uploaded_image'), async function (req, res, next) {
   message = '';
   console.log("signupenetercehcl ")
   var post = req.body;
   var name = post.username;
   var pass = post.password;
   var fname = post.firstname;
   var lname = post.lastname;
   var emial = post.email;


   // console.log(req.file);
   file = req.file;
   // 
   if (name == undefined || pass == undefined || fname == undefined || lname == undefined || emial == undefined || file == undefined) {
      message = "Fill out all information before pressing register!"
      await res.render('signup', {
         message: message
      })
   }
   var imgname = file.filename;
   var imgtype = file.mimetype;

   let buff = fs.readFileSync(file.path);
   let base64data = buff.toString('base64');
   //  console.log("name of file: "+ imgname+ " ,type of file: "+ imgtype)
   //  console.log(base64data);

   var checkEmailAndUser = "SELECT username, email FROM owners WHERE username =" + db.escape(name) + " OR email =" + db.escape(emial) + ";"
   var validityQuery = await db.query(checkEmailAndUser, async function (err, result) {
      if (err) {
         console.log(err);
         message = err.message + err.log
         res.render('signup', {
            message: message
         });
      }
      console.log(result[0]);
      if (result[0] == undefined) {
         await bcrypt.hash(pass, 10, async function (err, hash) {
            var sql = "INSERT INTO `antom`.`owners`(`firstname`,`lastname`,`email`,`username`,`password`) VALUES  (" + db.escape(fname) + "," + db.escape(lname) + "," + db.escape(emial) + "," + db.escape(name) + "," + db.escape(hash) + ")";
            // Store hash in database
            //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";
            var query = await db.query(sql, async function (err, result) {
               if (err) {
                  console.log("ERROR but what");
                  console.log("error log js: " + err.log);
                  console.log("error message js: " + err.message);

                  message = err.message + err.log
                  await res.render('signup', {
                     message: message
                  });
               }
            });

            var sql2 = "SELECT ownerid FROM owners WHERE username = " + db.escape(name) + ";"
            query = await db.query(sql2, async function (err2, result2) {

               if (err2) {
                  console.log("error log js: " + err2.log);
                  console.log("error message js: " + err2.message);

                  message = err2.message + err2.log
                  await res.render('signup', {
                     message: message
                  });
               }

               var sql3 = "INSERT INTO `house` (`ownerid`,`longitude`, `latitude`, `lastwindspeed`, `meanwind`, `stddevwind`,`broken`, `brokencount`, `brokenprobability`, `productionefficiency`,`production`,`meanconsumption`, `stddevconsumption`, `consumption`, `griddelta`,`gridbatterypercentage`, `batteryMax`, `battery`,`imgname`,`imgtype`,`image`)"
               sql3 = sql3 + " VALUES (" + db.escape(result2[0].ownerid) + ", 65.373, 22.811, 3.5, 6, 0.05, 0, 0, 0.05, 8, 55.3, 50, 0.8, 54.55, 0, 50.0, 200,100.0," + db.escape(imgname) + "," + db.escape(imgtype) + "," + db.escape(base64data) + ");"
               //console.log(sql3);
               query = await db.query(sql3, async function (err3, result3) {

                  if (err3) {
                     console.log("error log js: " + err3.log);
                     console.log("error message js: " + err3.message);

                     message = err3.message + err3.log
                     res.render('signup', {
                        message: message
                     });
                  }

                  message = "Your account has been created, sign in!";
                  await res.redirect('signin');
               });
            });
         })
      } else if (result[0].username == name) {
         console.log("USERNAME: " + result[0].username);
         message = "Username already in use!";
         res.render('signup', {
            message: message
         });
      } else if (result[0].email == emial) {
         message = "Email already in use!";
         res.render('signup', {
            message: message
         });
      }
   });

});




module.exports = router;