let Consumption = require("./consumption.js");
let WindTurbine = require("./WindTurbine.js")

class House {
    constructor(owner) {
        const consumption = new Consumption();
        const windTurbine = new WindTurbine();
        let battery = 100;
        let batterymax = 200;
        this.owner = owner;
        this.consumption = consumption;
        this.windTurbine = windTurbine;
        this.battery = battery;
        this.batterymax = batterymax
    }

    testCons() {
        console.log(this.owner + " owns this house and is consuming " + this.consumption.runConsumptionSim() + " kWh at the moment");
    }

    testprod() {
        if (this.windTurbine.getbroken() == true) {
            console.log(this.owner + " owns this house and the windturbine is broken so its not producing any power at the moment")
        } else {
            console.log(this.owner + " owns this house and is producing  " + this.windTurbine.getwindtrubineprod() + " kWh at the moment");
        }
    }

    houseenergytot() {
        let currentProduction = this.windTurbine.getwindtrubineprod();
        let windTurbinebroken = this.windTurbine.getbroken();
        let currentConsumption = this.consumption.runConsumptionSim();
        let difference = currentConsumption - currentProduction;

        this.battery -= difference;
        if (this.battery < 0) {
            this.battery = 0;
        } else if (this.battery > this.batterymax) {
            this.battery = this.batterymax;
        }
        if (windTurbinebroken) {
            console.log(this.owner + " owns this house and is consuming: ", currentConsumption, " the windturbine is broken so its not producing any power at the moment battery is at:", this.battery)
        } else {
            console.log(this.owner + " owns this house and is consuming: ", currentConsumption, "  and is producing  " + currentProduction + " kWh at the moment battery os at,", this.battery);

        }


    }

}

const houseTest = new House("Adam");
for (i = 0; i < 1000; i++) {
    houseTest.houseenergytot();
}