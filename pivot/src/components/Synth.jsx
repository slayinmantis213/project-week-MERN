import {useState, useLayoutEffect} from 'react';
import * as Tone from 'tone';

const Synth = (props) => {
    
    //INNER RIPPLE EFFECT

    const RippleButton = ({ children, onClick }) => {
        const [coords, setCoords] = useState({ x: -1, y: -1 });
        const [isRippling, setIsRippling] = useState(false);

        useLayoutEffect(() => {
            if (coords.x !== -1 && coords.y !== -1) {
                setIsRippling(true);
                setTimeout(() => setIsRippling(false), 800);
            } else setIsRippling(false);
        }, [coords]);

        useLayoutEffect(() => {
            if (!isRippling) setCoords({ x: -1, y: -1 });
        }, [isRippling]);

        return (
            <button
                className="ripple-button"
                onClick={e => {
                    const rect = e.target.getBoundingClientRect();
                    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                    onClick && onClick(e);
                }}
            >
                {isRippling ? (
                    <span
                        className="ripple"
                        style={{
                            left: coords.x,
                            top: coords.y
                        }}
                    />
                ) : (
                    ''
                )}
                <span className="content">{children}</span>
            </button>
        );
    };

    //SOUND

    const synth = new Tone.AMSynth()//.toDestination();
    // const feedbackDelay = new Tone.FeedbackDelay("8n.", 0.7);
    const feedbackDelay = new Tone.FeedbackDelay({
        delayTime: 0.3,
        feedback: 0.8,
        // maxDelay:2,
        // wet: 0.4,
    });
    const dist1 = new Tone.Distortion(0.9)

    synth.connect(feedbackDelay);
    feedbackDelay.toDestination();
    synth.connect(dist1);
    dist1.toDestination();

    const play = () => {
        // const now = Tone.now()
        synth.triggerAttackRelease("G3", "8n");
    }
    const osciPlay = () => {
        const osc = new Tone.Oscillator().toDestination();
        osc.frequency.value = "C4";
        osc.frequency.rampTo("C7", 8);
        osc.start().stop("+9");
    }
    const testing = (e) => {

        console.log(e);
    }

    return (
        <div>

                <RippleButton onClick={e => { play();testing(e.target);}}/>


                <RippleButton onClick={e => { play();testing(e.target);}}/>

        </div>
    )
}

export default Synth

// AutoPanner
//Distortion
//chorus