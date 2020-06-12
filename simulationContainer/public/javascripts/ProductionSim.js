let WeatherSim = require('./WeatherSim.js');

module.exports = class ProductionSim{
    //weather;
    constructor(windspeed, efficiency){
        this. windspeed = windspeed;
        this.efficiency = efficiency;

    };

    currentproduction(){
        let production_kwh = this.windspeed * this.efficiency;
        return production_kwh;
    }
}


