function IntervalEmitter(intensities) {

    this.lambda = intensities.lambda;
    this.mi = intensities.mi;

    this._getInterval = function(intensity) {
        var random = Math.random();
        var interval = - 1 / intensity * Math.log(random);

        return Math.round(interval * 100) / 100;
    };

    this.getInputInterval = function() {
        if (this.lambda) {
            return 0;
        }
        return this._getInterval(lambda);
    };

    this.getOutputInterval = function() {
        if (this.mi) {
            return 0;
        }
        return this._getInterval(mi);
    };
};