function Stopwatch() {
    this._time = 0;
    this._delta_ms = 10; // 0.01
    this._timer = null;
    this._handlers = {
        "started": [],
        "stopped": [],
        "reset": [],
        "timeChanged": []
    };
}

Stopwatch.prototype.addHandler = function (eventName, handlerFn) {

    this._handlers[eventName].push(handlerFn);

};

Stopwatch.prototype.raiseEvent = function(eventName) {

    var handlers = this._handlers[eventName],
        i;

    for (i=0; i<handlers.length; i++) {
        handlers[i](this);
    }

};

Stopwatch.prototype.start = function () {

    if (this._timer) return; // Nothing to do

    var that = this;

    this._timer = setInterval(function () {
        that._time += that._delta_ms / 1000.0;
        that.raiseEvent("timeChanged");
    }, this._delta_ms); // increase timer

    this.raiseEvent("started");

};

Stopwatch.prototype.stop = function () {

    if (!this._timer) return; // Nothing to do
    clearInterval(this._timer);
    this._timer = null;

    this.raiseEvent("stopped");

};

Stopwatch.prototype.reset = function () {

    this.stop();
    this._time = 0;

    this.raiseEvent("reset");

};

Stopwatch.prototype.isRunning = function () {
    return this._timer !== null;
};

Stopwatch.prototype.getCurrentTime = function() {
    return this._time;
};
