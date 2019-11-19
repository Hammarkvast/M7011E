var express = require('express');
var router = express.Router();
const request = require("request");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

request("https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/162860/period/latest-hour/data.json", function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var info = JSON.parse(body);
     //console.log(Object.keys(info.station)); 
   //   for (var i =0 ; i<Object.keys(info.station).length;i++){
//  
      // if (info.station[i].name == "Luleå Flygplats"){
         // console.log(info.station[i]);
      // }    
   // 
   //   }
      
   // var val = info.station[0].value;
     console.log(info);
     //console.log(val)u
   }
})


module.exports = router;
