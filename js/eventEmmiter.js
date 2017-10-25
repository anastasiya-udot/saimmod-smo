function EventEmitter(p, pi1, pi2) {
    this.p = p;
    this.pi1 = pi1;
    this.pi2 = pi2;

    this.requestProdused = function() {
        let rand = Math.random();
        return rand > this.p;
    };

    this.channel1Processed = function() {
        let rand = Math.random();
        return rand > this.pi1;
    };

    this.channel2Processed = function() {
        let rand = Math.random();
        return rand > this.pi2;
    };
};