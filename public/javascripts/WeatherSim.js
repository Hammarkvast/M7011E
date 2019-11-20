var gaussian = require('gaussian'); 


class WeatherSim{
    distribution;
    date;
    previouspeed = 7;
    timespan = 100;
    constructor(){
        this.distribution = new gaussian(0, 0.49);
        this.date = new Date();

    }

    weather(distribution,date, previouspeed){
        previouspeed += distribution.ppf(Math.random());
        this.previouspeed = previouspeed;
        return previouspeed
    }

    runweather(){
       
        var i = 0;

       // while(i < 5){
        for (let i = 0; i<this.timespan;i++){
            setTimeout(()=>{console.log(this.weather(this.distribution,this.date,this.previouspeed)); },i*1000)
        }   
       // console.log(this.weather(this.distribution,this.date,this.previouspeed));
        //setTimeout(function(){ alert("Hello"); }, 5000);
        //    i++;
       // }
        
    }
}

//const test = new WeatherSim();
//test.runweather();

