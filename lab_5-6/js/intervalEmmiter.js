function IntervalEmmiter(intensities) {

    this.lambda = intensities.lambda;
    this.mi = intensities.mi;

    this.sourceIntervals = [];

    this._getInterval = function(intensity) {
        var random = Math.random();
        var interval = - 1 / intensity * Math.log(random);

        return Math.round(interval * 100) / 100;
    };

    this.getInputInterval = function() {
        if (this.lambda === undefined) {
            return 0;
        }
        let interval = this._getInterval(this.lambda);
        this.sourceIntervals.push(interval);

        return interval;
    };

    this.getOutputInterval = function() {
        if (this.mi === undefined) {
            return 0;
        }
        return this._getInterval(this.mi);
    };
};