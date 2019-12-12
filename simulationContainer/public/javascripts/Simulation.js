var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');
//console.log("jadajdada")
router.use(bodyParser.json());
let WeatherSim = require('./WeatherSim.js');

async function Simulationtest({}){

    var sql = "SELECT id FROM owners;";
    await db.query(sql, function(err,result){
    if (err){
        console.log(err);
        res.sendStatus(500);
        return err;
    }
    console.log("testing testing: "+ result.length);
    console.log(result);
    
    for (i=0; i<result.length; i++){
        console.log("row: "+ result[i])
        console.log("value: " + result[i].id);
    }

    console.log("testing testint itnet ")
    return result[0];
    })  

}

module.exports = { Simulationtest };

