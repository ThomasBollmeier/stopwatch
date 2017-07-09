function App() {

    this._watch = new Stopwatch();
    this._$currtime = document.getElementById("currtime");
    this._$times = document.getElementById("times");

}

App.prototype.run = function() {

    this.initEventing();
    this.updateTimerDisplay(0);

};

App.prototype.initEventing = function() {

    var that = this;

    var btn = document.getElementById("start");
    btn.addEventListener("click", function () {
        if (!that._watch.isRunning()) {
            that._watch.start();
        } else {
            that._watch.stop();
        }
    });

    btn = document.getElementById("reset");
    btn.addEventListener("click", function () {
        that._watch.reset();
    });

    btn = document.getElementById("record");
    btn.addEventListener("click", function () {
        if (that._watch.isRunning())
            that.recordTime(that._watch.getCurrentTime());
    });

    document.addEventListener('keydown', function(event){

        switch (event.key) {
            case 's':
                that._watch.start();
                break;
            case 'r':
                that._watch.reset();
                break;
            case 't':
                that.recordTime(that._watch.getCurrentTime());
                break;
        }

    });

    // React to changes in stopwatch state:

    that._watch.addHandler("timeChanged", function () {
        that.updateTimerDisplay(that._watch.getCurrentTime());
    });

    that._watch.addHandler("reset", function () {
        that.updateTimerDisplay(that._watch.getCurrentTime());
        that.clearTimes();
    });

};

App.prototype.updateTimerDisplay = function(time) {

    this._$currtime.innerHTML = this.roundTime(time);

};

App.prototype.roundTime = function(time) {

    return Math.round((time + 0.00001) * 100) / 100;

};

App.prototype.recordTime = function(time) {

    this._$times.innerHTML += this.roundTime(time) + "<br>";

};

App.prototype.clearTimes = function() {

    this._$times.innerHTML = "";

};

new App().run();