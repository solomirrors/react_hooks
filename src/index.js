import React, {useContext, useEffect, useState} from "react";
import ReactDOM from "react-dom";

const App = () => {
    const [value, setValue] = useState(1);
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
                <PlanetInfo id={value}/>
            </div>
        )
    }
    else return <div>Hide Closed</div>
}

const PlanetInfo = ( {id} ) => {
    const [planetName, setPlanetName] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then(res => res.json())
            .then(data => !cancelled && setPlanetName(data.name));
        return () => cancelled = true;
    }, [id]);

    return (
        <div>
            <h1>{id} - {planetName}</h1>
        </div>
    )
}

const HookCounter = ({value}) => {
    useEffect(() => {
        console.log('EffectMount');
        return () => {
            console.log('EffectUnMount')
        }
    })

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

