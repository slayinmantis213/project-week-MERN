import { useState } from 'react';
import './App.scss';
import Button from './components/Button';

function App() {
    let actx = new AudioContext();
    let connection = actx.destination;
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    return (
        <div className="fixer">
            <h1 className="header">hopeful</h1>
            <div className="container">
                <Button
                    num={0}
                    actx={actx}
                    connection={connection}
                    frequency={138.59}
                    detuneA={0}
                    targetGainA={0.07}
                    detuneB={0}
                    targetGainB={0}
                />
                <Button
                    num={1}
                    actx={actx}
                    connection={connection}
                    frequency={207.65}
                    detuneA={5}
                    targetGainA={0.05}
                    detuneB={0}
                    targetGainB={0}
                />
                <Button
                    num={2}
                    actx={actx}
                    connection={connection}
                    frequency={311.13}
                    detuneA={0}
                    targetGainA={0.008}
                    detuneB={3}
                    targetGainB={0.005}
                />
                <Button
                    num={3}
                    actx={actx}
                    connection={connection}
                    frequency={466.16}
                    detuneA={0}
                    targetGainA={0.02}
                    detuneB={4}
                    targetGainB={0.02}
                />
                <Button
                    num={4}
                    actx={actx}
                    connection={connection}
                    frequency={698.46}
                    detuneA={0}
                    targetGainA={0.01}
                    detuneB={1}
                    targetGainB={0.008}
                />
            </div>
            <button className="help" onClick={(e) => toggleModal()}>
                ?
            </button>
            <div
                className={`overlay ${modal ? 'show' : ''}`}
                onClick={(e) => toggleModal()}
            ></div>
            <div className={`modal ${modal ? 'show' : ''}`}>
                <h2>Welcome to Hopeful</h2>
                <p>
                    Hopeful is a project dedicated to the creation of soothing,
                    modular soundscapes. Try clicking the circles.
                </p>
                <button className="confirm" onClick={(e) => toggleModal()}>
                    OK
                </button>
            </div>
        </div>
    );
}

export default App;
