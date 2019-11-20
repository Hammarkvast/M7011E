let WeatherSim = require('./WeatherSim.js');

class ProductionSim{
    weather;
    constructor(){
         this.weather = new WeatherSim();

    };

    currentproduction(){
        console.log("Enter check Poduction")
        this.weather.runweather();
    }
}

const test = new ProductionSim();
test.currentproduction();

