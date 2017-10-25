function State() {

    this.requestInSource = null;
    this.requestInChannel1 = null;
    this.requestInChannel2 = null;
    this.queue = null;
    

    this.blockSource = function(request) {
        this.requestInSource = request;
    };

    this.getRequestFromBlockedSource = function() {
        return this.requestInSource;
    };

    this.setQueue = function(queue) {
        this.queue = queue.getLength();
    };

    this.setRequestInChannel1 = function(request) {
        this.requestInChannel1 = request;
    };

    this.getRequestFromChannel1 = function() {
        return this.requestInChannel1;
    };

    this.setRequestInChannel2 = function(request) {
        this.requestInChannel2 = request;
    };

    this.getRequestFromChannel2 = function() {
        return this.requestInChannel2;
    };

    this.getDescription = function() {
        var s = this.requestInSource === null ? 0: 1;
        var c1 = this.requestInChannel1 === null ? 0: 1;
        var q = this.queue === null ? 0: this.queue;
        var c2 = this.requestInChannel2 === null ? 0: 1;

        return '' + s + c1 + q + c2;
    };

    this.isSourceBlocked = function() {
        return !!this.requestInSource;
    };

    this.isRequestInChannel1 = function() {
        return !!this.requestInChannel1;
    };

    this.isRequestInChannel2 = function() {
        return !!this.requestInChannel2;
    };

}