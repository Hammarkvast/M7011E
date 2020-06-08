// var express = require('express');
// var router = express.Router();
// var db = require('./db');
// var bodyParser = require('body-parser');
async function getuserdata(){
    await $.getJSON('/API/getUserData', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putvalues(userdata[0]);
    });
}

async function getmanagerpowerplantdata(){
    await $.getJSON('/API/getmanagerplantData', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
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
    puthandleusers(userdata);
  });
}

async function updatehandleuserdata(){
  await $.getJSON('/API/getmanagerhandleusers', function(userdata){
    putupdatehandleusers(userdata);
  });
}

async function getmanageruserblocked(){
  await $.getJSON('/API/getmanagerhandleuserblocked', function(userdata){
    putupdateblocked(userdata);
  });
}
async function getvisituserdata(userid){
    await $.getJSON('/API/getVisitUserData',{userid}, function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putvalues(userdata[0]);
    });
}

async function getalluserdata(){
  await $.getJSON('/API/getAllOwners', function(userdata){
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


async function settoggle(toggle){
    await $.getJSON('/API/settoggle',{toggle}, function() {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      
    });

}
async function setprice(price){
    await $.getJSON('/API/setprice',{price}, function() {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      
    });

}
async function setSlider(){
    await $.getJSON('/API/getSlider', function(userdata) {
      // userdata = JSON.stringify(userdata);
      //userdata = JSON.parse(userdata);
      //averageData = averageCountyWeather;
      // userdata = JSON.parse(userdata);
      putSlider(userdata);
      
    });

}