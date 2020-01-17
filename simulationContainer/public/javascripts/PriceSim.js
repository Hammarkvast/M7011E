
const ProductionSim = require('./ProductionSim.js');

module.exports = class PriceSim{
   
    constructor(tototalgridload){
        this.tototalgridload = tototalgridload;
    }

    price(){
        if (this.tototalgridload <200){
            let delta = 200 - this.tototalgridload;
            let val = (delta /1000) * 0.48;
            return val;
        }else {
            return 0.48;
        }
    }


}