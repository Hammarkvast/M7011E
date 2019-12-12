var gaussian = require('gaussian'); 


module.exports = class WeatherSim{
    previouspeed;
    timespan;
    distribution;
    date;
    constructor(previouspeed, mean, stddev){
        //let previouspeed = 7;
        //let timespan = 100;
        let minWind = 0;
        let highwind = 16;
        const distribution = new gaussian(mean, stddev);

        console.log("jjjjjjaaaaaaaaaaaaddddddddddddaaaaaaa"+ mean + "      " + stddev)
       // const date = new Date();

        //this.date=date;
        //this.timespan = timespan;
        this.distribution = distribution;
        this.previouspeed = previouspeed;
    }

    weather(){
        if (this.previouspeed>this.highwind){
            let difference = this.previouspeed-this.highwind
            this.previouspeed += this.distribution.ppf(Math.random()-this.decprob(difference));
        } else{
            this.previouspeed += this.distribution.ppf(Math.random());
        }
        if (this.previouspeed < 0){
            this.previouspeed = 0;
        }
        return this.previouspeed;
    }

    decprob(difference){{
        if (difference <=1){
            return 0.35;
        }
        return 0.35^difference + this.decprob(difference-1);
    }

    }

    // runweather(){
    //    console.log("enter chekc weather");  
        // var i = 0;
// 
        // for (let i = 0; i<this.timespan;i++){
            // setTimeout(()=>{console.log(this.weather(this.distribution,this.date,this.previouspeed)); },i*1000)
        // }   
        // for (let i = 0; i<100; i++){
            // console.log("nr in ppf; ", i/100," ppf value: ", this.distribution.ppf(i/100));
        // }
        // 
    // }
}

//const test = new WeatherSim();
//test.runweather();

