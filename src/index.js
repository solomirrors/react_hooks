import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <p>Hello, React!</p>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
