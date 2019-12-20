var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');
//console.log("jadajdada")
router.use(bodyParser.json());
let WeatherSim = require('./WeatherSim.js');
let ProductionSim = require('./ProductionSim.js');
let Consumption = require('./Consumption.js');
let BrokenSim = require('./BrokenSim.js');
let BatterySim = require('./BatterySim.js');
let PriceSim = require('./PriceSim.js');


async function Simulationtest({}){

    var sql = "SELECT ownerid FROM owners;";
    await db.query(sql, async function(err,result){
    if (err){
        console.log(err);
        res.sendStatus(500);
        return err;
    }
    console.log("testing testing: "+ result.length);
    console.log(result);
    
    for (i=0; i<result.length; i++){
        await WeatherSimulation(result[i].ownerid);
        await prodSimulation(result[i].ownerid);
        await consumptionSimulation(result[i].ownerid);
        await brokensimulation(result[i].ownerid);
        await batterysimulation(result[i].ownerid);
    }
    // await pricesimulation();

    console.log("testing testint itnet ")
    return result[0];
    })  

}

async function WeatherSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+id+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT lastwindspeed, meanwind, stddevwind, battery FROM house WHERE houseid = "+ houseid +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let weather = new WeatherSim(result2[0].lastwindspeed, result2[0].meanwind, result2[0].stddevwind);
            let lastwindspeed = weather.weather()
            console.log("lastwindspeed: " + lastwindspeed)
            var sql3 = "UPDATE antom.house SET lastwindspeed = "+ lastwindspeed + " WHERE houseid ="+id+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            console.log("mayby success");
            })
        }) 
    })
}

async function prodSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+id+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT lastwindspeed, productionefficiency FROM house WHERE houseid = "+ houseid +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let prod = new ProductionSim(result2[0].lastwindspeed, result2[0].productionefficiency);
            let production = prod.currentproduction();
            console.log("production: " + production)
            var sql3 = "UPDATE antom.house SET production = "+ production + " WHERE houseid ="+id+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            console.log("mayby success2");
            })
        }) 
    })
}
// 
async function consumptionSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+id+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT consumption FROM house WHERE houseid = "+ houseid +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let consumptionsim = new Consumption(result2[0].consumption, 8, 0.8);
            let consumption = consumptionsim.consumption();
            console.log("production: " + consumption)
            var sql3 = "UPDATE antom.house SET consumption = "+ consumption + " WHERE houseid ="+id+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            console.log("mayby success3");
            })
        }) 
    })
}

// 
async function brokensimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+id+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT broken, brokencount, brokenprobability FROM house WHERE houseid = "+ houseid +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let BrokeSim = new BrokenSim(result2[0].brokencount, result2[0].broken, result2[0].brokenprobability);
            let broken = BrokeSim.getbroken();
            let count = result2[0].brokencount;
            if(result[0].broken == true && broken == fasle ){
                count = 0;
            }
            else{
                count = count +1;
            }

            if(broken == true){
                broken = 1;
            }else{
                broken = 0;
            }

            console.log("broken: " + broken)
            var sql3 = "UPDATE antom.house SET broken = "+ broken +",brokencount = "+ count+ " WHERE houseid ="+id+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            console.log("mayby success4");
            })
        }) 
    })
}


async function batterysimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+id+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT gridbatterypercentage, batteryMax, battery, consumption, production FROM house WHERE houseid = "+ houseid +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let battsim = new BatterySim(result2[0].battery, result2[0].batteryMax, result2[0].production, result2[0].consumption, result2[0].gridbatterypercentage);
            let battery = [];
            battery = battsim.batteryfunc();

            console.log("battery: " + battery)
            console.log("result battery: "+ result2[0].battery + "  "+ result2[0].batteryMax) ;

            batterylevel = battery[0];
            griddelta = battery[1];            

            var sql3 = "UPDATE antom.house SET battery = "+ batterylevel +",griddelta = "+ griddelta+ " WHERE houseid ="+id+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            console.log("mayby success5");
            })
        }) 
    })
}


async function pricesimulation(){
    var sql = "SELECT SUM(griddelta) FROM house;";
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        console.log("price sim consile log: " + result[0]);
        let priceSimvar = new PriceSim(result[0]);
        let price = priceSimvar.price();
        
        var sql2 = "UPDATE antom.totalelectricity SET totalnetproduction = " + result[0] +". totalelectricityprice" + price ;
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
        }) 
    })
}


module.exports = { Simulationtest };

