function Channel(mi) {
    this._request = null;
    this.mi = mi;
    this.emmiter = new IntervalEmitter({
        mi: this.mi
    });

    var outputTimeCounter = 0;
    var currentOutputInterval = 0;

    this.add = function(request) {
        currentOutputInterval = this.emmiter.getOutputInterval();
        this._request = request;
    };

    this.addSystemTimeToRequest = function(time) {
        this._request.timeInSystem += time;
    };
}