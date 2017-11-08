function Request(takt) {
    this.takt = takt;
    this.timeInQueue = 0;

    this.isProcessed = false;
}