var gaussian = require('gaussian'); 


class WeatherSim{
    distribution;
    date;
    previousspped = 7;
    timespan = 100;
    constructor(){
        this.distribution = new gaussian(0, 0.49);
        this.date = new Date();

    }

    weather(distribution,date, previousspped){
        previousspped += distribution.ppf(Math.random());
        this.previousspped = previousspped;
        return previousspped
    }

    runweather(){
       
        var i = 0;

       // while(i < 5){
        for (let i = 0; i<this.timespan;i++){
            setTimeout(()=>{console.log(this.weather(this.distribution,this.date,this.previousspped)); },i*1000)
        }   
       // console.log(this.weather(this.distribution,this.date,this.previousspped));
        //setTimeout(function(){ alert("Hello"); }, 5000);
        //    i++;
       // }
        
    }
}

const test = new WeatherSim();
test.runweather();

