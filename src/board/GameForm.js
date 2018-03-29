import React from 'react';

/* https://codepen.io/PiotrBerebecki/pen/dpRdKP?editors=0010 */

/**
 * 
 */
class GameForm extends React.Component
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

        // Function for handling number of rows required for the board
        this.handleRows = this.handleRows.bind(this);
        // Function for handling number of cols required for the board
        this.handleCols = this.handleCols.bind(this);
        // Function for handling submitting the form data to Game component
        this.handleSubmit = this.handleSubmit.bind(this);
        // Function for handling reset of the game
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handlePuzzleLevel = this.handlePuzzleLevel.bind(this);
    }

    /**
     * @brief - Function for handling number of rows required for the board
     * @param {*} event 
     */
    handleRows(event)
    {
        this.setState({numRows: event.target.value});
    }

    /**
     * @brief - Function for handling number of cols required for the board
     * @param {*} event 
     */
    handleCols(event)
    {
        this.setState({numCols: event.target.value});
    }

    /**
     * @brief - Function for handling submitting the form data to Game component
     * @param {*} event 
     */
    handleSubmit(event)
    {
        /*console.log('(Child) Number of rows in the board: ' + this.state.numRows);
        console.log('(Child) Number of cols in the board: ' + this.state.numCols);*/
        event.preventDefault();
        // Call game handle sent from Game component
        this.props.handleFromGame(this.state.numRows, this.state.numCols, 
                                    this.state.puzzleLevel);
    }

    handlePuzzleLevel(event)
    {
        this.setState({
            puzzleLevel: event.target.value
        });
    }

    /**
     * @brief - Function for handling reset of the game
     * @param {*} event 
     */
    handleNewGame(event)
    {
        // Prevent default action for button
        event.preventDefault();
        // Call the reset handle sent from Game component
        this.props.handleForNewGame();
    }

    /**
     * 
     */
    render()
    {
        return (
            <div className="game-form-controls">
                <form onSubmit={this.handleSubmit} className="game-form">
                    <div className="game-form-item">
                        <input type="number" value={this.state.numRows} 
                                min="3" max="20"
                                placeholder="Number of rows..." onChange={this.handleRows} />
                        <input type="number" value={this.state.numCols}
                                min="3" max="20"
                                placeholder="Number of cols..." onChange={this.handleCols} />
                    </div>
                    <div className="game-form players">
                        <label> Puzzle level </label>
                        <select value={this.state.puzzleLevel} onChange={this.handlePuzzleLevel}>
                            <option value="easy">Easy</option>
                        </select>
                    </div>
                    <div className="game-form submit">
                        <button type="submit" 
                                value="Submit" 
                                className="game-form submit">
                            Submit
                        </button>
                    </div>
                </form>
                <button className="game-form reset" onClick={this.handleNewGame}>New Game</button>
            </div>
        );
    }
}


export default GameForm;