let WeatherSim = require('./WeatherSim.js');

class ProductionSim{
    weather;
    constructor(){
        const weather = new WeatherSim();
        this.weather = weather;
    };

    currentproduction(){
        let windspeed = this.weather.weather();
        let production_kwh = windspeed * 8;
        return production_kwh;
    }
}

const test = new ProductionSim();
var avg =0;
for (i = 0; i <100;i++){
    let output = test.currentproduction();
    avg += output;
    console.log(output);
}
console.log("final avg: ", avg/100,"\n");

