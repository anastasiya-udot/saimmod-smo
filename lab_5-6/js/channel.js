function Channel(number, mi) {
    this.number = number;
    this._request = undefined;
    this.mi = mi;
    this.emmiter = new IntervalEmmiter({
        mi: this.mi
    });

    this.requestsProcessed = [];

    this.add = function(request, timeUnit) {
        request.outputInterval = this.emmiter.getOutputInterval();
        request.outputTime = timeUnit + request.outputInterval;
        request.outputTime = Math.round(request.outputTime * 100) / 100;
        this._request = request;
    };

    this.isEmpty = function() {
        return this._request === undefined;
    };

    this.getProcessedRequests = function() {
        return this.requestsProcessed;
    };

    this.updateState = function(timeUnit) {

        if (timeUnit >= this._request.outputTime) {
            this.requestsProcessed.push(this._request);

            this._request = undefined;
        }
    };

    this.addSystemTimeToRequest = function(time) {
        this._request.timeInSystem += time;
        this._request.timeInSystem = Math.round(this._request.timeInSystem * 100) / 100;
    };
}