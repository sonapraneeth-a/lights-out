import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './board/Game';


ReactDOM.render (
    <Game
        title="Lights Out"
        version="v0.10.0"
        debug="yes"
    />,
    document.getElementById("app")
);

registerServiceWorker();

