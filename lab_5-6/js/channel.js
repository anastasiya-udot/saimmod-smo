function Channel(number, mi) {
    this.number = number;
    this._request = undefined;
    this.mi = mi;
    this.emmiter = new IntervalEmmiter({
        mi: this.mi
    });

    this.requestsProcessed = [];

    var outputTimeCounter = 0;
    var currentOutputInterval = 0;

    this.add = function(request) {
        currentOutputInterval = this.emmiter.getOutputInterval();
        outputTimeCounter = 0;
        this._request = request;
    };

    this.isEmpty = function() {
        return !this._request;
    };

    this.getProcessedRequests = function() {
        return this.requestsProcessed;
    };

    this.updateState = function(time) {
        outputTimeCounter += time;

        if (outputTimeCounter >= currentOutputInterval) {
            outputTimeCounter = 0;
            this.requestsProcessed.push(this._request);

            this._request = undefined;
        }
    };

    this.addSystemTimeToRequest = function(time) {
        this._request.timeInSystem += time;
    };
}