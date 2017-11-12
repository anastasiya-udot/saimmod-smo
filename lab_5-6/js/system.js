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

    //для перепроверки лямбда
    var counter = 0;
    var reqNumber = 0;
    var forIntesity = [];

    var request = new Request();

    request.inputInterval = emmiter.getInputInterval();
    request.inputTime = request.inputInterval;    

    for (var timeUnit = 0; timeUnit < timeUnits; ) {

        _.each(queuingSystems, function(queuingSystem) {
            queuingSystem.rememberLength();
            queuingSystem.rememberState(timeAdd);
            queuingSystem.updateChannel(timeUnit);
        });

               
        if (timeUnit >= request.inputTime) {
            queuingSystems[currentIndexQS].add(request, timeUnit);

            currentIndexQS += 1;
            if (currentIndexQS == n) {
                currentIndexQS = 0;
            }

            request = new Request();
            request.inputInterval = emmiter.getInputInterval();
            request.inputTime = timeUnit + request.inputInterval;
            request.inputTime = Math.round(request.inputTime * 100) / 100;
        }

        timeUnit += timeAdd
        timeUnit = Math.round(timeUnit * 100) / 100;
    }

    var requestsLength = 0;

    var commonSystemLength = 0;
    var commonTimeInSystem = 0;

    var commonTimeInQueue = 0;
    var commonQueueLength = 0;

    var commonState = {};


    _.each(queuingSystems, function(queuingSystem) {
        var requests = queuingSystem.channel.getProcessedRequests();
        var state = queuingSystem.getState();

        console.log('requests.length ' + queuingSystem.number + '  ' + requests.length);

        requestsLength += requests.length; 

        _.each(requests, function(request) {
            var timeInSystem = request.outputTime - request.inputTime;

            commonTimeInSystem += timeInSystem;
            commonTimeInSystem = Math.round(commonTimeInSystem * 100) / 100;

            commonTimeInQueue += timeInSystem - request.outputInterval;
            commonTimeInQueue = Math.round(commonTimeInQueue * 100) / 100;
        });

        _.each(state, function(time, requestsNumber) {
            if (commonState[requestsNumber] === undefined) {
                commonState[requestsNumber] = time;
            } else {
                commonState[requestsNumber] += time;
            }
        });
        

        commonSystemLength += queuingSystem.getCommonLength();
        commonSystemLength = Math.round(commonSystemLength * 100) / 100;
        
        commonQueueLength += queuingSystem.queue.getCommonLength();
        commonQueueLength = Math.round(commonQueueLength * 100) / 100;
    });

    _.each(commonState, function(time, requestsNumber) {
        console.log('P' + requestsNumber + ' = ' + time / n / (timeUnits / timeAdd));
    });

    console.log('Lq = ', commonQueueLength / n / (timeUnits / timeAdd));
    console.log('Ls = ', commonSystemLength / n / (timeUnits / timeAdd));

    console.log('Wq = ', commonTimeInQueue / requestsLength);
    console.log('Ws = ', commonTimeInSystem / requestsLength);


    delete Q1;
    delete Q2;
    delete Q3;
    delete emmiter;
}