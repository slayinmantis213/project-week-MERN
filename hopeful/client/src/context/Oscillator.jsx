class Oscillator {
    constructor(actx, frequency, detune, targetGain) {
        this.actx = actx;
        this.osc = actx.createOscillator();
        this.osc.frequency.value = frequency;
        this.osc.detune.value = detune;
        this.targetGain = targetGain;
        this.gateGain = actx.createGain();
        this.gateGain.gain.value = 0;
        this.osc.connect(this.gateGain);
        this.easing = 0.005;
        this.isRunning = false;
        this.started = 0
    }

    start() {
        console.log('oscillator should start')
        console.log(this.isRunning)
        if (this.started == 0) {
            this.osc.start();
            this.gateGain.connect(this.actx.destination)
        }
        this.gateGain.gain.setTargetAtTime(this.targetGain, this.actx.currentTime, .7)
        this.isRunning = true;
        this.started = 1
    }

    stop() {
        console.log('oscillator should stop')
        console.log(this.isRunning)
        this.isRunning = false;
        let stopTime = this.actx.currentTime
        this.gateGain.gain.setTargetAtTime(0, stopTime, .5)
    }

    startStop() {
        console.log('sphere clicked')
        if (this.isRunning) this.stop();
        else this.start();
    }
}

export default Oscillator