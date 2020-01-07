// var express = require('express');
// var router = express.Router();
// var db = require('./db');
// var bodyParser = require('body-parser');
console.log("test")
async function getuserdata(){
    console.log("testfunction entercheck")
    await $.getJSON('/owners/getUserData', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      console.log(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putvalues(userdata[0]);
    });
}

async function getelectricityprice(){
    console.log("testfunction entercheck electricity price")
    await $.getJSON('/owners/getElectricityPrice', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      console.log(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putElectricity(userdata[0]);
    });
}

