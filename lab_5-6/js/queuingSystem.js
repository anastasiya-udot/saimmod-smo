function QueuingSystem(number, mi) {
    this.number = number;

    this.queue = new Queue();
    this.channel = new Channel(number, mi);

    this._commonLength = 0;

    this.add = function(request) {
        if (this.channel.isEmpty()) {
             this.channel.add(request);
        } else {
            this.queue.add(request);
        }
    };

    this.getCommonLength = function() {
        return this._commonLength;
    };

    this.updateChannel = function(time) {
        if (this.channel.isEmpty() && !this.queue.isEmpty()) {
            var tempRequest = this.queue.pop();

            this.channel.add(tempRequest);
        } else if (!this.channel.isEmpty()) {
            this.channel.updateState(time);
        }
    };

    this.rememberLength = function() {
        this._commonLength += this.queue.getLength();

        if (!this.channel.isEmpty()) {
            this._commonLength += 1;
        }
        this.queue.rememberLength();
    }

    this.addTimeToRequests = function(time) {
        this.queue.addTimeToRequests(time);

        if (!this.channel.isEmpty()) {
            this.channel.addSystemTimeToRequest(time);
        }
    };
}