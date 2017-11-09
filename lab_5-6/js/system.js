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

    //для перепроверки лямбда
    var counter = 0;
    var reqNumber = 0;
    var forIntesity = [];

    var request;

    for (var timeUnit = 0; timeUnit < timeUnits; ) {

        _.each(queuingSystems, function(queuingSystem) {
            queuingSystem.updateChannel(timeAdd);
        });
        
        if (inputTimeCounter >= currentInputInterval) {
            inputTimeCounter = 0;
            currentInputInterval = emmiter.getInputInterval();

            request = new Request();
            
            queuingSystems[currentIndexQS].add(request);
            reqNumber += 1;

            currentIndexQS += 1;
            if (currentIndexQS == n) {
                currentIndexQS = 0;
            }
        }

        //для перепроверки лямбда
        counter += timeAdd;
        counter = Math.round(counter * 100) / 100;

        if (counter == 1) {
            counter = 0;
            forIntesity.push(reqNumber);
            reqNumber = 0;
        }

        inputTimeCounter += timeAdd;
        inputTimeCounter = Math.round(inputTimeCounter * 100) / 100;

        timeUnit += timeAdd
        timeUnit = Math.round(timeUnit * 100) / 100;

        _.each(queuingSystems, function(queuingSystem) {
            queuingSystem.addTimeToRequests(timeAdd);
            queuingSystem.rememberLength();
        });
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
            commonTimeInQueue = Math.round(commonTimeInQueue * 100) / 100;
        
            commonTimeInSystem += request.timeInSystem;
            commonTimeInSystem = Math.round(commonTimeInSystem * 100) / 100;
        });

        commonSystemLength += queuingSystem.getCommonLength();
        commonSystemLength = Math.round(commonSystemLength * 100) / 100;
        
        commonQueueLength += queuingSystem.queue.getCommonLength();
        commonQueueLength = Math.round(commonQueueLength * 100) / 100;
    });

    console.log('Lq = ', commonQueueLength / n / (timeUnits / timeAdd));
    console.log('Ls = ', commonSystemLength / n / (timeUnits / timeAdd));

    console.log('Wq = ', commonTimeInQueue / requestsLength);
    console.log('Ws = ', commonTimeInSystem / requestsLength);

    var sum = 0;

    _.each(forIntesity, function(val) {
        sum += val;
    });


    console.log('lambda = ', sum / forIntesity.length);

    sum = 0;

    _.each(QS1.channel.forIntesity, function(val) {
        sum += val;
    });

    console.log('mi = ', sum / QS1.channel.forIntesity.length);

    sum = 0;
    
   /* _.each(emmiter.sourceIntervals, function(val) {
        sum += val;
        sum = Math.round(sum * 100) / 100;
    });

    console.log('lambda= ', 1 / sum * emmiter.sourceIntervals.length);
    */

    delete Q1;
    delete Q2;
    delete Q3;
    delete emmiter;
}