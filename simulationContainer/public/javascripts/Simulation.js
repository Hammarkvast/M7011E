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
    for (i = 0; i < ; i++){
        console.log("result: " + result[i].id);
    }
    return result[0];
    })

}

module.exports = { Simulationtest };

