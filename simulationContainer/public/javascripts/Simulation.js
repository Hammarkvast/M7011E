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
let coalPowerPLantSim = require('./CoalPowerPlantSim.js')


async function Simulationtest({}){
    timeout = 5000;
    setInterval(async () => {
        
        var sql = "SELECT ownerid,blockedtime, secondsblocked FROM owners;";
        await db.query(sql, async function(err,result){
            if (err){
                console.log(err);
                res.sendStatus(500);
                return err;
            }
            console.log(result);
            
            for (i=0; i<result.length; i++){
                await WeatherSimulation(result[i].ownerid);
                await prodSimulation(result[i].ownerid);
                await consumptionSimulation(result[i].ownerid);
                await brokensimulation(result[i].ownerid);
                await batterysimulation(result[i].ownerid, result[i].blockedtime, result[i].secondsblocked);
                await blackoutcheck(result[i].ownerid);
            }
            await coalPLant();
            await pricesimulation();
            
            return result[0];
        })  
        
    }, timeout);
}

async function WeatherSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT lastwindspeed, meanwind, stddevwind, battery FROM house WHERE houseid = "+ db.escape(houseid) +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let weather = new WeatherSim(result2[0].lastwindspeed, result2[0].meanwind, result2[0].stddevwind);
            let lastwindspeed = weather.weather()
            console.log("lastwindspeed: " + lastwindspeed)
            var sql3 = "UPDATE antom.house SET lastwindspeed = "+ db.escape(lastwindspeed) + " WHERE houseid ="+db.escape(houseid)+";";
            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            })
        }) 
    })
}

async function prodSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT lastwindspeed, productionefficiency FROM house WHERE houseid = "+ db.escape(houseid) +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let prod = new ProductionSim(result2[0].lastwindspeed, result2[0].productionefficiency);
            let production = prod.currentproduction();
            console.log("production: " + production)
            var sql3 = "UPDATE antom.house SET production = "+ db.escape(production) + " WHERE houseid ="+db.escape(houseid)+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            })
        }) 
    })
}
// 
async function consumptionSimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT consumption FROM house WHERE houseid = "+ db.escape(houseid) +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let consumptionsim = new Consumption(result2[0].consumption, 8, 0.8);
            let consumption = consumptionsim.consumption();

            var sql3 = "UPDATE antom.house SET consumption = "+ db.escape(consumption) + " WHERE houseid ="+db.escape(houseid)+";";


            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            })
        }) 
    })
}

// 
async function brokensimulation(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT broken, brokencount, brokenprobability FROM house WHERE houseid = "+ db.escape(houseid) +";";

        
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
            
            var sql3 = "UPDATE antom.house SET broken = "+ db.escape(broken) +",brokencount = "+ db.escape(count)+ " WHERE houseid ="+db.escape(houseid)+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            })
        }) 
    })
}


async function batterysimulation(id,blockedtime, secondsblocked){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        let houseid = result[0].houseid;
        
        var sql2 = "SELECT gridbatterypercentage, batteryMax, battery, consumption, production FROM house WHERE houseid = "+ db.escape(houseid) +";";

        
        await db.query(sql2, async function(err2,result2){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            
            let battsim = new BatterySim(result2[0].battery, result2[0].batteryMax, result2[0].production, result2[0].consumption, result2[0].gridbatterypercentage,blockedtime, secondsblocked);
            let battery = [];
            battery = battsim.batteryfunc();


            batterylevel = battery[0];
            griddelta = battery[1];            

            var sql3 = "UPDATE antom.house SET battery = "+ db.escape(batterylevel) +",griddelta = "+ db.escape(griddelta)+ " WHERE houseid ="+db.escape(houseid)+";";

            await db.query(sql3, function(err2,result){
            if (err2){
                console.log(err2);
                res.sendstatus(500);
                return err2;
            }
            })
        }) 
    })
}


async function coalPLant(){
    var sql =  "SELECT * FROM powerplant;"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
        for(i = 0; i<result.length; i++){
            await coalPLantSimulation(result[i])
        }    
    })        
}

async function coalPLantSimulation(values){

    let powerplant = new coalPowerPLantSim(values.production, values.meanproduction, values.stddevproduction);
    let produced = powerplant.producion();
    let buffersim = new BatterySim(values.buffer, values.bufferMax, produced, 0, values.gridbufferpercentage);

    let batteryresult = buffersim.batteryfunc();
    


    var sql =  "update antom.powerplant SET production = "+ db.escape(produced) + ", buffer = "+ db.escape(batteryresult[0])+", griddelta = " + db.escape(batteryresult[1])+ "where powerplantid = "+db.escape(values.powerplantid)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        
    })
}


async function blackoutcheck(id){
    var sql =  "SELECT houseid FROM house WHERE ownerid  = "+db.escape(id)+";"; 
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            res.sendstatus(500);
            return err;
        }
        // if gridnet <= 0 and battery = 0 and consumption greater than simulation blackout
        var sql2 = "select consumption, production, battery FROM house WHERE houseid = "+db.escape(result[0].houseid)+";"
        let gridnet = 0;
        let consumption =0;
        let production = 0;
        let battery = 0;
        await db.query(sql2, async function(err,result2){
            if (err){
                console.log(err);
                res.sendstatus(500);
                return err;
            }
            consumption = result2[0].consumption;
            production = result2[0].production;
            battery = result2[0].battery;
        });

        var sql3 = "SELECT totalnetproduction FROM totalelectricity WHERE id = 1;" 
        await db.query(sql3, async function(err,result3){
            if (err){
                console.log(err);
                res.sendstatus(500);
                return err;
            }
            gridnet = result3[0].totalnetproduction;
        });
        if (gridnet <=0 && production < consumption && battery <=0){
            var sqlblackout = "UPDATE house SET blackout = 1;"
        }else{
            var sqlblackout = "UPDATE house SET blackout = 0;"
        }
        await db.query(sqlblackout, async function(err,result4){
            if (err){
                console.log(err);
                res.sendstatus(500);
                return err;
            }
        });
    });
}

async function pricesimulation(){
    var sql = "SELECT SUM(griddelta) AS sumgrid FROM house;";
    await db.query(sql, async function(err,result){
        if (err){
            console.log(err);
            result.sendstatus(500);
            return err;
        }
        let grideltavar = result[0].sumgrid;
        console.log("JAAAA DUUU VAAAD HÄÄÄÄNNNNNDDDDEEEERRRRRR",grideltavar);
        let priceSimvar = new PriceSim(grideltavar);
        let price = priceSimvar.price();
        
        var sql2 = "UPDATE antom.totalelectricity SET totalnetproduction = " + db.escape(grideltavar) +", totalelectricityprice =" + db.escape(price) ;
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

