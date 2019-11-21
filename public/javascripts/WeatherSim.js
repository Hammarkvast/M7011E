var gaussian = require('gaussian'); 


module.exports = class WeatherSim{
    previouspeed;
    timespan;
    distribution;
    date;
    constructor(){
        let previouspeed = 7;
        let timespan = 100;
        const distribution = new gaussian(0, 0.49);
        const date = new Date();

        this.date=date;
        this.timespan = timespan;
        this.distribution = distribution;
        this.previouspeed = previouspeed;
    }

    weather(){
        this.previouspeed += this.distribution.ppf(Math.random());
        return this.previouspeed;
    }

    runweather(){
       console.log("enter chekc weather");  
        var i = 0;

        for (let i = 0; i<this.timespan;i++){
            setTimeout(()=>{console.log(this.weather(this.distribution,this.date,this.previouspeed)); },i*1000)
        }   
        // for (let i = 0; i<100; i++){
            // console.log("nr in ppf; ", i/100," ppf value: ", this.distribution.ppf(i/100));
        // }
        
    }
}

//const test = new WeatherSim();
//test.runweather();

