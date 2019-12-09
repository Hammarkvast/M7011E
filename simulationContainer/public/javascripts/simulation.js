let WeatherSim = require('./WeatherSim.js');

module.exports = class Simulation{
    
    constructor(){
        //users
        var id = [];
        for (i in id){
            //getdata
            const weather = new WeatherSim(lastdata, mean , stddev);
            var lastwindspeed = weather.weather.weather();
            //updatedata
        }
        
    };

    currentsim(){
        let windspeed = this.weather.weather();
        let production_kwh = windspeed * 8;
        return production_kwh;
    }
}

