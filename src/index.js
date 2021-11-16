import React, {useContext, useEffect, useState} from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v+1)}
                >
                    +
                </button>
                <button
                    onClick={() => setVisible(false)}
                >
                    Hide
                </button>
                <Notification/>
            </div>
        )
    }
    else return <div>Hide Closed</div>
}

const HookCounter = ({value}) => {
    useEffect(() => {
        console.log('EffectMount');
        return () => {
            console.log('EffectUnMount')
        }
    },[])

    return <p>{value}</p>
}

const Notification = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 3500)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div >
            {visible && <p>Hello!</p>}
        </div>
    )
}


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

