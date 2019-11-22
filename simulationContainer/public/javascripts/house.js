let Consumption = require("./consumption.js");
let WindTurbine = require("./WindTurbine.js")

class House{
    constructor(owner){
        const consumption = new Consumption();
        const windTurbine = new WindTurbine();
        this.owner = owner;
        this.consumption = consumption;
        this.windTurbine = windTurbine;
    }

    testCons(){
        console.log(this.owner + " owns this house and is consuming " + this.consumption.runConsumptionSim() + " kWh at the moment");        
    }

    testprod(){
        console.log(this.owner + " owns this house and is producing  " + this.windTurbine.getwindtrubineprod() + " kWh at the moment");        
    }

}

const houseTest = new House("Adam");
for(i = 0; i<100; i++){
    houseTest.testCons();
    houseTest.testprod();
}