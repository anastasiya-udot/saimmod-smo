$(document).ready(function() {
    var queue = new Queue(2);
    var emmiter = new EventEmitter(0.75, 0.7, 0.65);
    var takts = 100000;
    var states = {};
    var currentState;
    var futureState;
    var requests = [];
    var request;

    var generateNewRequest = function(takt) {
        var request = new Request(takt);

        requests.push(request);
        return request;
    };

    var rememberCurrentState = function() {
        if (states[currentState.getDescription()] === undefined) {
            states[currentState.getDescription()] = 1;
        } else {
            states[currentState.getDescription()] += 1;
        }
    };

    for (var takt = 0; takt < takts; takt++) {
        futureState = new State();

        if (_.isEmpty(states)) {
            currentState = futureState;
            rememberCurrentState()
            continue;
        }
        
        if (currentState.isRequestInChannel2()) {
            request = currentState.getRequestFromChannel2()

            if (emmiter.channel2Processed()) {
                request.isProcessed = true;

                if (!queue.isEmpty()) {
                    request = queue.pop();
                    futureState.setRequestInChannel2(request);
                }

            } else {
                futureState.setRequestInChannel2(request);
            }

            futureState.setQueue(queue);
        }

        if (currentState.isRequestInChannel1()) {
            request = currentState.getRequestFromChannel1();

            if (emmiter.channel1Processed()) {

                if (queue.isEmpty() && !futureState.isRequestInChannel2()) {
                    futureState.setRequestInChannel2(request);
                } else if ((!queue.isEmpty() || futureState.isRequestInChannel2()) && !queue.isFull()) {
                    queue.add(request);
                }

            } else {
                futureState.setRequestInChannel1(request);
            }

            futureState.setQueue(queue);
        }

        if (currentState.isSourceBlocked()) {
            request = currentState.getRequestFromBlockedSource();
    
            if (futureState.isRequestInChannel1()) {
                futureState.blockSource(request);
            } else {
                futureState.setRequestInChannel1(request);
            }
        } else {
            if (emmiter.requestProdused()) {
                request = generateNewRequest(takt);

                if (futureState.isRequestInChannel1()) {
                    futureState.blockSource(request);
                } else {
                    futureState.setRequestInChannel1(request);
                } 
            }
        }

        queue.addTactToRequests();
        queue.rememberLength();        

        currentState = _.clone(futureState);
        rememberCurrentState();
    }

    var requestsProcessed = _.filter(requests, function(r) {
        return r.isProcessed;
    });

    var requestQueueTime = 0;

    _.each(requests, function(r) {
        requestQueueTime += r.timeInQueue;
    });

    _.each(_.keys(states), function(key) {
        states[key] = states[key] / takts;
    });

    var A = requestsProcessed.length / takts;
    var Lq = queue.getCommonLength() / takts;
    var Wq = requestQueueTime / requests.length;

    delete requests;
    delete requestsProcessed;

    console.log('A = ' + A + ', Lq = ' + Lq + ', Wq = ' + Wq);
    console.log(states);
});