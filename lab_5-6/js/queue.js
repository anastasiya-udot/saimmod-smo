function Queue() {

    this._queue = [];
    this._commonLength = 0;

    this.add = function(request) {
        this._queue.unshift(request);
    };

    this.pop = function() {
        return this._queue.pop();
    };

    this.isEmpty = function() {
        return !this._queue.length;
    };

    this.addTimeToRequests = function(time) {
        _.each(this._queue, function(request) {
            request.timeInQueue += time;
            request.timeInSystem += time;
        });
    };

    this.rememberLength = function() {
        this._commonLength += this._queue.length;
    };

    this.getCommonLength = function() {
        return this._commonLength;
    };
    
    this.getLength = function() {
        return this._queue.length;
    };
}