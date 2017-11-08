function startSystem() {
    var lambda = 10;
    var mi = 3.5;
    var n = 3;

    var emmiter = new IntervalEmmiter({
        lambda: lambda
    });

    var timeUnits = 10000;
    var timeAdd = 0.01;

    var QS1 = new QueuingSystem(1, mi);
    var QS2 = new QueuingSystem(2, mi);
    var QS3 = new QueuingSystem(3, mi);

    var queuingSystems = [QS1, QS2, QS3];
    var currentIndexQS = 0;

    var inputTimeCounter = 0;
    var currentInputInterval = emmiter.getInputInterval();

    var request;

    for (var timeUnit = 0; timeUnit < timeUnits; timeUnit += timeAdd) {
        if (inputTimeCounter >= currentInputInterval) {
            inputTimeCounter = 0;
            currentInputInterval = emmiter.getInputInterval();

            if (currentIndexQS === 0) {
                qs1Intervals.push(currentInputInterval);
            }
        } else {
            inputTimeCounter += timeAdd;
        }

        _.each(queuingSystems, function(queuingSystem) {
            queuingSystem.addTimeToRequests(timeAdd);
            queuingSystem.updateChannel(timeAdd);
            queuingSystem.rememberLength();
        });

        if (!inputTimeCounter) {
            request = new Request();
            
            queuingSystems[currentIndexQS].add(request);

            currentIndexQS += 1;
            if (currentIndexQS == n) {
                currentIndexQS = 0;
            }
        }
    }

    var requestsLength = 0;

    var commonSystemLength = 0;
    var commonTimeInSystem = 0;

    var commonTimeInQueue = 0;
    var commonQueueLength = 0;


    _.each(queuingSystems, function(queuingSystem) {
        var requests = queuingSystem.channel.getProcessedRequests();

        requestsLength += requests.length; 

        _.each(requests, function(request) {
            commonTimeInQueue += request.timeInQueue;
            commonTimeInSystem += request.timeInSystem;
        });

        commonSystemLength += queuingSystem.getCommonLength();
        commonQueueLength += queuingSystem.queue.getCommonLength();
    });

    console.log('Lq = ', commonQueueLength / (timeUnits / timeAdd));
    console.log('Ls = ', commonSystemLength / (timeUnits / timeAdd));

    console.log('Wq = ', commonTimeInQueue / requestsLength);
    console.log('Ws = ', commonTimeInSystem / requestsLength);
}