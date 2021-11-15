import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <React.Fragment>
            <HookSwitcher/>
        </React.Fragment>
    )
}

const HookSwitcher = () => {
    const [color, setColor] = useState('white')
    const [fontSize, setFontSize] = useState(30)

    return (
        <div
            style={{
                padding: '10px',
                backgroundColor: color,
                fontSize: `${fontSize}px`
            }}
        >
            Hello, React Hooks!
            <button onClick={() => setColor('green')}>Green</button>
            <button onClick={() => setColor('red')}>Red</button>
            <button onClick={() => setFontSize((s) => s+2)}>FontSize +</button>
            <button onClick={() => setFontSize((s) => s-2)}>FontSize -</button>
        </div>
    )
}