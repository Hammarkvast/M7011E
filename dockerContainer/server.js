'use strict';

const express = require('express');
const request = require('request')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
//app.get('/', (req, res) => {
//  res.send('Hello world\n');
//});

app.use(express.static('public'));

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

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   var response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
