let WeatherSim = require('./WeatherSim.js');

module.exports = class ProductionSim{
    //weather;
    constructor(windspeed, efficiency){
        this. windspeed = windspeed;
        this.efficiency = efficiency;

        //const weather = new WeatherSim();
        //this.weather = weather;
    };

    currentproduction(){
        //let windspeed = this.weather.weather();
        let production_kwh = this.windspeed * this.efficiency;
        return production_kwh;
    }
}

// const test = new ProductionSim();
// var avg =0;
// for (i = 0; i <1000;i++){
    // let output = test.currentproduction();
    // avg += output;
    // console.log(output);
// }
// console.log("final avg: ", avg/1000,"\n");

