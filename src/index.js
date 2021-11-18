import React, {useCallback, useEffect, useState, useMemo} from "react";
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

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: false
    }), [])

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data, loading: false, error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null, loading: false, error
            }))
        return () => cancelled = true;
    }, [request]);

    return dataState;
}


const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id]);
    return useRequest(request);
}

const PlanetInfo = ( {id} ) => {
    const {data, loading, error} = usePlanetInfo(id);

    if (error)
        return <div>Something is wrong</div>
    if (loading)
        return <div>Loading</div>

    return (
        <div>
            <h1>{id} - {data && data.name}</h1>
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

