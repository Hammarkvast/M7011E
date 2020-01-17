var gaussian = require("gaussian");

module.exports = class Consumption {
    distribution;
    prevConsumption;
    constructor(previousProduction,mean, stddev){
        const distribution = gaussian(mean, stddev);
        this.distribution = distribution;
        this.previosProduction = previousProduction;
    }

    producion(){
        let prevProdcdf = this.distribution.cdf(this.previosProduction);
        prevProdcdf+= (Math.random()-0.5);
        return this.distribution.ppf(prevProdcdf);
    }

    runConsumptionSim(){
        //setInterval(() => {console.log(this.consumption(this.prevConsumption, this.distribution)); }, 1000);
        return this.consumption();
    }

}