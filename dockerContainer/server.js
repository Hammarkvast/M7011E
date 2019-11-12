'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
//app.get('/', (req, res) => {
//  res.send('Hello world\n');
//});

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile("./" + "index.html" );
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


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
