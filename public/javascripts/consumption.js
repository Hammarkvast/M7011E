var gaussian = require("gaussian");

class consumption {
    distribution;
    prevConsumption = 300;
    constructor(){
        this.distribution = gaussian(0, 0.8)
    }

    consumption(prevConsumption, distribution){
        prevConsumption+= distribution.ppf(Math.random());
        this.prevConsumption = prevConsumption;
        return prevConsumption;
    }

    runConsumptionSim(){
        setTimeout(() => {console.log(this.consumption(this.prevConsumption, this.distribution)); }, 1);
    }

}