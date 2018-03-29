import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './board/Game';


ReactDOM.render (
    <Game
        title="Lights Out"
        version="v0.11.1"
        debug="yes"
    />,
    document.getElementById("app")
);

registerServiceWorker();

