var gaussian = require('gaussian');


module.exports = class WeatherSim {
    previouspeed;
    timespan;
    distribution;
    date;
    constructor(previouspeed, mean, stddev) {
        let minWind = 0;
        let highwind = 16;
        const distribution = new gaussian(mean, stddev);


        this.distribution = distribution;
        this.previouspeed = previouspeed;
        this.highwind = highwind;
        this.minWind = minWind;
    }

    weather() {
        if (this.previouspeed > this.highwind) {
            let difference = this.previouspeed - this.highwind;
            let deltawindpeed = this.distribution.ppf(Math.random() - this.decprob(difference));
            console.log("current speed = " + this.previouspeed + " delta windspeed =  " + deltawindpeed);
            this.previouspeed += deltawindpeed;
        } else {
            this.previouspeed += this.distribution.ppf(Math.random());
        }
        if (this.previouspeed < 0) {
            this.previouspeed = 0;
        }
        return this.previouspeed;
    }

    decprob(difference) {
        {
            if (difference <= 1) {
                return 0.35;
            }
            return 0.35 ^ difference + this.decprob(difference - 1);
        }

    }

}