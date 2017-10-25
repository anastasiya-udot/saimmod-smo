function Request(number) {
    this.number = number;
    this.timeInQueue = 0;

    this.isProcessed = false;
}