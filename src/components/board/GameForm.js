import React from 'react';
/*import { withStyles } from 'material-ui/styles';*/
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';

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

        // Function for handling size of the board
        this.handleBoardSize = this.handleBoardSize.bind(this);
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
     * @brief - Function for handling the size of the board
     * @param {*} event 
     */
    handleBoardSize(event)
    {
        this.setState({
            numRows: parseInt(event.target.value, 10),
            numCols: parseInt(event.target.value, 10),
        });
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
                        <InputLabel htmlFor="board-size-helper">Size fo board</InputLabel>
                        <Select
                            value={this.state.numRows}
                            onChange={this.handleBoardSize}
                            id="board-size-helper"
                        >
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                        </Select>
                    </div>
                    <div className="game-form players">
                        <InputLabel htmlFor="puzzle-level-helper">Puzzle Level</InputLabel>
                        <Select
                            value={this.state.puzzleLevel}
                            onChange={this.handlePuzzleLevel}
                            id="puzzle-level-helper"
                        >
                            <MenuItem value={"easy"}>Easy</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"difficult"}>Difficult</MenuItem>
                        </Select>
                    </div>
                    <div className="game-form submit">
                        <Button variant="raised" 
                                color="primary" 
                                type="submit" 
                                value="Submit" 
                                className="game-form submit">
                            Submit
                        </Button>
                    </div>
                </form>
                <Button variant="raised" color="primary" className="game-form reset" onClick={this.handleNewGame}>
                    New Game
                </Button>
            </div>
        );
    }
}


export default GameForm;

/*export default withStyles(styles)(GameForm);*/