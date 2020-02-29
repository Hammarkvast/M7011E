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


async function getvisituserdata(userid){
    await $.getJSON('/API/getVisitUserData',{userid}, function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      console.log(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putvalues(userdata[0]);
    });
}

async function getalluserdata(){
  await $.getJSON('/API/getAllOwners', function(userdata){
    console.log("hej!");
    putuserprofiledata(userdata);
  })
}

async function getvisitownerdata(userid){
  await $.getJSON('/API/getVisitOwnerData',{userid}, function(userdata){
    putOwnerData(userdata[0]);
  });
}

async function getvisitelectricityprice(userid){
    await $.getJSON('/API/getVisitElectricityPrice',{userid}, function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putElectricity(userdata[0]);
    });

}