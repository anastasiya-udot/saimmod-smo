function startSystem() {
    var lambda = 12;
    var mi = 3.5;
    var n = 3;

    var emitter = new IntervalEmitter({
        lambda: lambda
    });

    var timeUnits = 1000000;
    var timeAdd = 0.01;

    var QS1 = new QueuingSystem(mi);
    var QS2 = new QueuingSystem(mi);
    var QS3 = new QueuingSystem(mi);

    var queuingSystems = [QS1, QS2, QS3];
    var currentIndexQS = 0;

    var inputTimeCounter = 0;
    var currentInputInterval = 0;

    var request;

    for (var timeUnit = 0; timeUnit < this.timeUnits; timeUnit += timeAdd) {
        if (inputTimeCounter >= currentInputInterval) {
            request = new Request();

            queuingSystems[currentIndexQS].add(request);

            currentIndexQS += 1;
            if (currentIndexQS == n) {
                currentIndexQS = 0;
            }

            inputTimeCounter = 0;
            currentInputInterval = emitter.getInputInterval();

        } else {
            inputTimeCounter += 0.01;
        }

        _.each(queuingSystems, function(queuingSystem) {
            queuingSystem.addTimeToRequests(timeAdd);
        });
    }
}