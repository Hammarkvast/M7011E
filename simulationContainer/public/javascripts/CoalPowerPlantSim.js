var gaussian = require("gaussian");

module.exports = class Consumption {
    distribution;
    prevConsumption;
    constructor(previousProduction,mean, stddev, onoroff, changetimestate){
        const distribution = gaussian(mean, stddev);
        this.distribution = distribution;
        this.previosProduction = previousProduction;
        this.onoroff = onoroff;
        this.changetimestate = changetimestate;
    }

    producion(){
        var d = new Date();
        var time = d.getTime();

        let prevProdcdf = this.distribution.cdf(this.previosProduction);
        prevProdcdf+= (Math.random()-0.5);
        let  amntProduced = this.distribution.ppf(prevProdcdf);
        let timediff = time-this.changetimestate;
        if (this.onoroff ==1){
            if (timediff < 30000){
                let scalar = timediff * (1/30000);
                let finamntprod = amntProduced * scalar;
                return finamntprod;
            }else{
                return amntProduced;
            }
        }else{
            if (timediff<30000){
                let scalar = timediff * (1/30000);
                let finamntprod = amntProduced * (1-scalar);
                return finamntprod;
            }else{
                return 0;
            }
        }
    }

    runConsumptionSim(){
        //setInterval(() => {console.log(this.consumption(this.prevConsumption, this.distribution)); }, 1000);
        return this.consumption();
    }

}