var express = require('express');
var router = express.Router();
const request = require("request");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.post('/',function(req,res){
  request("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/162860/period/latest-hour/data.json", function (error, response, body) {
     if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.value[0].value);
      }
  })
//})

module.exports = router;
