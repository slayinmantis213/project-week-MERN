import React from 'react';
import * as Tone from 'tone';

const Synth = (props) => {
    const synth = new Tone.AMSynth()//.toDestination();
    // const feedbackDelay = new Tone.FeedbackDelay("8n.", 0.7);
    const feedbackDelay = new Tone.FeedbackDelay({
        delayTime: 0.3,
        feedback: 0.5,
        // maxDelay:2,
        // wet: 0.4,
    });
    const dist1 = new Tone.Distortion(0.9)
    // const dist2 = new Tone.Distortion(0.8)
    // const dist3 = new Tone.Distortion(0.7)
    synth.connect(feedbackDelay);
    feedbackDelay.toDestination();
    synth.connect(dist1);
    // synth.connect(dist2);
    // synth.connect(dist3);
    dist1.toDestination();
    // dist2.toDestination();
    // dist3.toDestination();


    const play = () => {
        // const now = Tone.now()
        synth.triggerAttackRelease("G3", "8n");
    }
    // const osciPlay = () => {
    //     const osc = new Tone.Oscillator().toDestination();
    //     osc.frequency.value = "C4";
    //     osc.frequency.rampTo("C7", 8);
    //     osc.start().stop("+9");
    // }
    return (
        <div>Synth
            <button id='sound1' onClick={play}></button>
        </div>
    )
}

export default Synth

// AutoPanner
//Distortion
//chorus