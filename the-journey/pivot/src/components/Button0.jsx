import {useState, useLayoutEffect} from 'react';

const Button0 = (props) => {
    const {num} = props
    const [classes, setClasses] = useState([`button${num}`])
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
                className={`button${num}`}
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
    const toggleOut = (e) => {
        const reset = e.className.split(" ")
        if(reset[1] == "out-rip"){
            setTimeout(()=>{e.className = reset[0]}, 300)
        }else{
            e.className += " out-rip"
        }
    }
    
    // const toggleOut = (e) => {
    //     if(classes[1] == "out-rip"){
    //         setTimeout(()=>{setClasses([`button${num}`])}, 300)
    //     }else{
    //         setClasses([`button${num}`, "out-rip"])
    //     }
    // }

    return (
        <div>
            <RippleButton onClick={e=>{toggleOut(e.target)}}/>
        </div>
    )
}

export default Button0
