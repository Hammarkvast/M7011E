let Consumption = require("./consumption.js");

class House{
    constructor(owner){
        const consumption = new Consumption();
        this.owner = owner;
        this.consumption = consumption;
    }

    testCons(){
        console.log(this.owner + " owns this house and is consuming " + this.consumption.runConsumptionSim() + " kWh at the moment");        
    }

}

const houseTest = new House("Adam");
houseTest.testCons();