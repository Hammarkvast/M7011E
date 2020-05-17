
const ProductionSim = require('./ProductionSim.js');

module.exports = class PriceSim{
   
    constructor(tototalgridload){
        this.tototalgridload = tototalgridload;
    }

    price(){
        let price =  0.8-this.tototalgridload*0.001
        if (price <0){
            price = 0;
        } 
        return price;
    }


}