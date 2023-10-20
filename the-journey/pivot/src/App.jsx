import {useState} from "react";
import './App.scss'
import Button0 from "./components/Button0";



function App() {
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        if(modal){
            setModal(false);
        }else{
            setModal(true)
        }
    }

    return (
        <div className="fixer">
            <h1 className="header">Hopeful</h1>
            <div className="container">
                <Button0 num={0} />
                <Button0 num={1} />
                <Button0 num={2} />
                <Button0 num={3} />
                <Button0 num={4} />
            </div>
            <button className="help" onClick={e=>toggleModal()}>?</button>
            <div className={`overlay ${modal ? 'show' : ''}`} onClick={e=>toggleModal()}></div>
            <div className={`modal ${modal ? 'show' : ''}`}>
                <h2>Welcome to Hopeful Synth</h2>
                <p>
                    Hopeful is a project dedicated to the creation of soothing, modular soundscapes.
                    Try clicking the circles!
                </p>
                <button className="confirm" onClick={e=>toggleModal()}>OK</button>
            </div>
        </div>
    )
}

export default App
