const ProductionSim = require('./ProductionSim.js');

module.exports = class BatterySim{
   
    constructor(battery, batterymax, production, consumption){
        this.battery = battery;
        this.batterymax = batterymax;
        this.production = production;
        this.consumption= consumption;
    }

    batteryfunc(){
        console.log("consumption battery: " + this.consumption);
        console.log("production battery: " + this.production);
        console.log("battery battery: " + this.battery);
        console.log("batteryMax battery: " + this.batterymax);
        let val = this.production - this.consumption;
        let batterytemp = this.battery + val;
        console.log("jada check val: "+ val + "   batterytemp: "+batterytemp);
        if (batterytemp > this.batterymax){ 
            this.battery = this.batterymax;
            let griddelta = batterytemp -this.battery;
            let batteryarray =  [this.battery, griddelta];  
            console.log("BA1: "+batteryarray);
            return batteryarray;
        } 
        else if (batterytemp <= 0){
            this.battery = 0;
            let griddelta = batterytemp; 
            let batteryarray =  [this.battery, griddelta];  
            console.log("BA2: "+batteryarray);
            return batteryarray;
        }
        else{
            let batteryarray =  [batterytemp, 0]; 
            console.log("BA3: "+batteryarray);
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