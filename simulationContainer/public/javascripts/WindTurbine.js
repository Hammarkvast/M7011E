const ProductionSim = require('./ProductionSim.js');

module.exports = class Windturbine {
    production;
    broken;
    count;
    constructor() {
        const production = new ProductionSim();
        let broken = false;
        let count = 0;
        this.production = production;
        this.broken = broken;
        this.count = count;
    }

    getwindtrubineprod() {
        let val = Math.random();
        if (val <= 0.01) {
            this.broken = true;
        }
        if (this.count >= 5) {
            this.broken = false;
            this.count = 0;
        }
        if (this.broken == true) {
            this.count += 1;
            return 0;
        }


        return this.production.currentproduction();
    }

    getbroken() {
        return this.broken;
    }

}
