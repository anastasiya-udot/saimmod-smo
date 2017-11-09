function Channel(number, mi) {
    this.number = number;
    this._request = undefined;
    this.mi = mi;
    this.emmiter = new IntervalEmmiter({
        mi: this.mi
    });

    this.requestsProcessed = [];

    //для перепроверки мю
    var counter = 0;
    var reqNumber = 0;
    this.forIntesity = [];

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
        outputTimeCounter = Math.round(outputTimeCounter * 100) / 100;

        if (outputTimeCounter >= currentOutputInterval) {
            outputTimeCounter = 0;
            this.requestsProcessed.push(this._request);
            reqNumber += 1;

            this._request = undefined;
        }

        counter += time;
        counter = Math.round(counter * 100) / 100;

        if (counter == 1) {
            counter = 0;
            this.forIntesity.push(reqNumber);
            reqNumber = 0;
        }
    };

    this.addSystemTimeToRequest = function(time) {
        this._request.timeInSystem += time;
        this._request.timeInSystem = Math.round(this._request.timeInSystem * 100) / 100;
    };
}