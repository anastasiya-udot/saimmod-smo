function QueuingSystem(number, mi) {
    this.number = number;

    this.queue = new Queue();
    this.channel = new Channel(number, mi);

    this._commonLength = 0;

    this._state = {};

    this.add = function(request, timeUnit) {
        if (this.channel.isEmpty()) {
            if (!this.queue.isEmpty()) {
                 var tempRequest = this.queue.pop();

                this.channel.add(tempRequest, timeUnit);
                this.queue.add(request);
                return;
            }
            this.channel.add(request, timeUnit);
        } else {
            this.queue.add(request);
        }
    };

    this.getCommonLength = function() {
        return this._commonLength;
    };

    this.updateChannel = function(timeUnit) {
        if (!this.channel.isEmpty()) {
            this.channel.updateState(timeUnit);
        }

        if (this.channel.isEmpty() && !this.queue.isEmpty()) {
            var tempRequest = this.queue.pop();

            this.channel.add(tempRequest, timeUnit);
        } 

    };

    this.getLength = function() {
        var length = this.queue.getLength();
        
        if (!this.channel.isEmpty()) {
            length += 1;
        }

        return length;
    };

    this.rememberLength = function() {
        this._commonLength += this.getLength();

        this.queue.rememberLength();
    }

    this.rememberState = function(time) {
        var length = this.getLength();

        if (this._state[length] === undefined) {
            this._state[length] = time;
        } else {
            this._state[length] += time;
        }

        this._state[length] = Math.round(this._state[length] * 100) / 100;
    };

    this.getState = function() {
        return this._state;
    };
}