// var express = require('express');
// var router = express.Router();
// var db = require('./db');
// var bodyParser = require('body-parser');
async function getuserdata(){
    await $.getJSON('/API/getUserData', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      console.log(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putvalues(userdata[0]);
    });
}

async function getownerdata(){
  await $.getJSON('/API/getOwnerData', function(userdata){
    putOwnerData(userdata[0]);
  });
}

async function getelectricityprice(){
    await $.getJSON('/API/getElectricityPrice', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putElectricity(userdata[0]);
    });
}


async function gethandleuserdata(){
  await $.getJSON('/API/getmanagerhandleusers', function(userdata){
    console.log(userdata);
    puthandleusers(userdata);
  });
}

