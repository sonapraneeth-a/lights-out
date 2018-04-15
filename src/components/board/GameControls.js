import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

/**
 * 
 */
class GameControls extends React.Component
{
    /**
     * @brief - Constructor for GameForm component
     * @param {*} props 
     */
    constructor(props)
    {
        super(props);
        this.state = {
            numRows: 3,          // Number of rows in the board
            numCols: 3,          // Number of columns in the board
            puzzleLevel: "easy", // Level of the puzzle
        };
        this.handleOneStepBefore = this.handleOneStepBefore.bind(this);
        this.handleOneStepAfter = this.handleOneStepAfter.bind(this);
        this.handleJump = this.handleJump.bind(this);
    }

    /**
     * @brief - Function for handling reset of the game
     * @param {*} event 
     */
    handleOneStepBefore(event)
    {
        // Prevent default action for button
        event.preventDefault();
        // Call the reset handle sent from Game component
        this.props.moveBefore();
    }

    /**
     * @brief - Function for handling reset of the game
     * @param {*} event 
     */
    handleJump(event)
    {
        // Prevent default action for button
        event.preventDefault();
        // Call the reset handle sent from Game component
        this.props.jump();
    }

    /**
     * @brief - Function for handling reset of the game
     * @param {*} event 
     */
    handleOneStepAfter(event)
    {
        // Prevent default action for button
        event.preventDefault();
        // Call the reset handle sent from Game component
        this.props.moveNext();
    }

    /**
     * 
     */
    render()
    {
        return (
            <div style={{display: "flex"}}>
                <button  onClick={this.handleOneStepBefore}>
                    &lt;
                </button>
                <button  onClick={this.handleJump}>
                    O
                </button>
                <button  onClick={this.handleOneStepAfter}>
                    &gt;
                </button>
            </div>
        );
    }
}


export default GameControls;