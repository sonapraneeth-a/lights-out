import React from 'react';
import '../styles/css/index.css';

class GameInfo extends React.Component
{
    render ()
    {
        return (
            <div className="game-info">
                <div>
                    {this.props.moves}
                </div>
            </div>
        );
    }
}

export default GameInfo;