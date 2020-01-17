var gaussian = require("gaussian");

module.exports = class Consumption {
    distribution;
    prevConsumption;
    constructor(previousConsumption,mean, stddev){
        let prevConsumption = previousConsumption;
        const distribution = gaussian(mean, stddev);
        this.distribution = distribution;
        this.prevConsumption = prevConsumption;
    }

    consumption(){
        let prevconscdf = this.distribution.cdf(this.prevConsumption);
        prevconscdf+= (Math.random()-0.5);
        return this.distribution.ppf(prevconscdf);
    }

    runConsumptionSim(){
        //setInterval(() => {console.log(this.consumption(this.prevConsumption, this.distribution)); }, 1000);
        return this.consumption();
    }

}