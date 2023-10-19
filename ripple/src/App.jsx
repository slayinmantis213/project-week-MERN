import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const RippleButton = ({ children, onClick }) => {
        const [coords, setCoords] = useState({ x: -1, y: -1 });
        const [isRippling, setIsRippling] = useState(false);

        useEffect(() => {
            if (coords.x !== -1 && coords.y !== -1) {
                setIsRippling(true);
                setTimeout(() => setIsRippling(false), 300);
            } else setIsRippling(false);
        }, [coords]);

        useEffect(() => {
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

    return (
        <div>
            <RippleButton>Please</RippleButton>
        </div>
    )
}

export default App
