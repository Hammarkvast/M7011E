var gaussian = require("gaussian");

module.exports = class Consumption {
    distribution;
    prevConsumption;
    constructor(){
        let prevConsumption = 45;
        const distribution = gaussian(0, 0.8);
        this.distribution = distribution;
        this.prevConsumption = prevConsumption;
    }

    consumption(){
        this.prevConsumption+= this.distribution.ppf(Math.random());
        return this.prevConsumption;
    }

    runConsumptionSim(){
        //setInterval(() => {console.log(this.consumption(this.prevConsumption, this.distribution)); }, 1000);
        return this.consumption();
    }

}