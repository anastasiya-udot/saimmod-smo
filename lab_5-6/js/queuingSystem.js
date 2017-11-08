function QueuingSystem(mi) {
    this.mi = mi;

    this.queue = new Queue();
    this.channel = new Channel();

    this.addNewRequest = function(request) {
        if (this.queue.isEmpty()) {
             this.channel.add(request);
        } else {
            this.queue.add(request);
        }
    };

    this.addTimeToRequests = function(time) {
        this.queue.addTimeToRequests(time);
        this.channel.addSystemTimeToRequest(time);
    };
}