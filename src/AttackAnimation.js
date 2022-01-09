class Animation {
    constructor(min, max, frontSpeed, backSpeed) {
        this.forward = true;
        this.val = 0;
        this.active = false;

        this.max = max;
        this.min = min;
        this.fs = frontSpeed;
        this.bs = backSpeed;
    }

    /**
     * delta is time passed since the last frame
     * 
     * @param delta 
     */
    update(delta) {
        console.log("val: " + this.val);
        if (this.forward) {
            this.val += delta * this.fs;
            if (this.val >= this.max) {
                this.val = this.max;
                this.forward = false;
            }
        }
        else {
            this.val -= delta * this.bs;
            if (this.val <= this.min) {
                this.val = this.min;
                this.forward = true;
            }
        }
    }
}

module.exports = Animation;
