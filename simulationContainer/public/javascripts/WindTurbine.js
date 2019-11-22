const ProductionSim = require('./ProductionSim.js');

module.exports = class Windturbine{
    production;
    broken;
    count;
    constructor(){
        const production = new ProductionSim();
        let broken = false;
        let count = 0;
        this.production  = production;
        this.broken = broken;
        this.count = count;
    }

    getwindtrubineprod(){
        let val = Math.random();
        console.log(val);
        if (val <= 0.01){
            this.broken = true;
        } 
        console.log("Är jag dum i huvudet eller vad?!?!: ",this.count);
        if (this.count >= 5){
            console.log("enter check")
            this.broken = false; 
            this.count = 0;
        }
        if (this.broken == true){
            this.count += 1;
            return -1;
        }


        return this.production.currentproduction();
    }

}

// const wt = new Windturbine();
// for (i = 0; i <1000; i++){
    // console.log(wt.getwindtrubineprod());
// }