const ProductionSim = require('./ProductionSim.js');

module.exports = class BatterySim {

    constructor(battery, batterymax, production, consumption, batterygridpercentage, blockedtime, secondsblocked) {
        this.battery = battery;
        this.batterymax = batterymax;
        this.production = production;
        this.consumption = consumption;
        this.batterygridpercentage = batterygridpercentage / 100;
        this.blockedtime = blockedtime;
        this.secondsblocked = secondsblocked;
    }

    batteryfunc() {

        var d = new Date();
        var time = d.getTime();
        if (this.blockedtime + this.secondsblocked * 1000 > time) {
            this.batterygridpercentage = 1

            let val = this.production - this.consumption;

            let batterytemp = this.battery + (val * this.batterygridpercentage);
            if (batterytemp > this.batterymax) {
                batterytemp = this.batterymax
            }
            return [batterytemp, 0]
        }
        let val = this.production - this.consumption;

        let batterytemp = this.battery + (val * this.batterygridpercentage);
        let griddelta = val - (val * this.batterygridpercentage);
        if (batterytemp > this.batterymax) {
            this.battery = this.batterymax;
            griddelta += batterytemp - this.battery;
            let batteryarray = [this.battery, griddelta];
            return batteryarray;
        } else if (batterytemp <= 0) {
            this.battery = 0;
            griddelta += batterytemp;
            let batteryarray = [this.battery, griddelta];
            return batteryarray;
        } else {
            let batteryarray = [batterytemp, griddelta];
            return batteryarray;
        }
    }

    //getbroken(){
    // if (this.count >=5){
    // this.count = 0;
    // this.broken = false;
    // } 
    // if (this.broken){
    // this.count++;
    // }
    //  return this.broken;
    //}

}

// const wt = new Windturbine();
// for (i = 0; i <1000; i++){
// console.log(wt.getwindtrubineprod());
// }