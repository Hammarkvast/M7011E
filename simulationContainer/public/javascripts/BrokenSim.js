
module.exports = class BrokenSim{
    broken;
    count;
    constructor(count, broken,brokenprob){
        this.broken = broken;
        this.count = count;
        this.brokenprob = brokenprob;
    }

    getbroken(){
        let val = Math.random();
        if (val <= this.brokenprob){
            this.broken = true;
            return true;
        } 
        if (this.count >= 5){
            this.broken = false; 
            this.count = 0;
            return false
        }
        if (this.broken == true){
            this.count += 1;
            return true;
        }
    }


}
