function Queue(dimension) {

    this._queue = [];
    this.dimension = dimension;
    this.commonLength = 0;

    this.add = function(request) {

        if (this.isFull()) {
            return console.log('WARNING! Trying to add new item into the full queue');
        }

        this._queue.unshift(request);
    };

    this.pop = function() {
        if (this.isEmpty()) {
            console.log('WARNING! Trying to get item from the empty queue');
            return {};
        }

        return this._queue.pop();
    };

    this.isFull = function() {
        return this._queue.length === this.dimension;
    };

    this.addTactToRequests = function() {
        _.each(this._queue, function(request) {
            request.timeInQueue += 1;
        });
    };

    this.rememberLength = function() {
        this.commonLength += this.getLength();
    };

    this.isEmpty = function() {
        return this._queue.length === 0;
    };

    this.getLength = function() {
        return this._queue.length;
    };

    this.getCommonLength = function() {
        return this.commonLength;
    }

}