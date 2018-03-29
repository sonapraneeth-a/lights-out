import React from "react";
import Board from "./Board";
import GameForm from "./GameForm";
import "../styles/css/index.css";

const version = {
    fontSize: "1rem",
    paddingLeft: "1rem"
}

/**
 * @brief - Game component which handles all the aspects of the game
 */
class Game extends React.Component
{
    /**
     * @brief - Constructor for the Game component
     * @param {*} props - 
     */
    constructor(props)
    {
        super(props);
        // Handles for setting this.config for GameForm component from Game component
        this.handleFromGameInfo = this.handleFromGameInfo.bind(this);
        // Handles for resetting the game for GameForm component from Game component
        this.handleNewGame = this.handleNewGame.bind(this);
        // Configuration of the game board
        this.config = {
            numRows: 3, // Number of rows in the board
            numCols: 3, // Number of cols in the board
        };
        // Current state of the game
        this.state = {
            boardHistory: [{
                squares: this.createEmptyBoard(this.config.numRows, this.config.numCols),
                // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
            }],                 // History of moves on the board
            moveHistory: [{
                message: "Game start",
            }],                  // History of status messages regarding the game
            stepNumber: 0,       // Which move number?
            numSquaresTurnedOff: 0, // How many squares have been filled currently?
            winner: false,
        };
    }

    /**
     * @brief - Creates an empty 2D array
     * @param {*} numRows - Number of rows required for the board
     * @param {*} numCols - Number of columns required for the board
     */
    createEmptyBoard(numRows, numCols)
    {
        var board = new Array(numRows);
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            board[rowIndex] = new Array(numCols);
            // Creating a board row
            for (let colIndex = 0; colIndex < numCols; colIndex++)
            {
                board[rowIndex][colIndex] = "on";
            }
        }
        return board;
    }

    /**
     * @brief - Set the game config sent by GameForm
     * @param {*} numRows - Number of rows for the board
     * @param {*} numCols - Number of cols for the board
     */
    handleFromGameInfo(numRows, numCols)
    {
        this.config.numRows = parseInt(numRows, 10); // Set the number of rows for the board
        this.config.numCols = parseInt(numCols, 10); // Set the number of cols for the board
        // Reset the game based on information provided by the user
        this.newGame();
    }

    /**
     * @brief - Handle for GameForm to reset the game
     */
    handleNewGame()
    {
        // Reset the game
        this.newGame();
    }

    /**
     * @brief - Resets the game to the initial state
     */
    newGame()
    {
        // Resetting the game would mean setting the state of the board to what it
        // originally started with. Please see constructor for the original state
        // of the board
        this.setState({
            boardHistory: [{
                squares: this.createEmptyBoard(this.config.numRows, this.config.numCols),
                // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
            }],
            moveHistory: [{
                message: "Game start",
            }],
            stepNumber: 0,
            numSquaresTurnedOff: 0,
            winner: false,
        });
    }

    /**
     * 
     * @param {*} squares 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    changeSquares(squares, rowIndex, colIndex)
    {
        let numRows = squares.length;
        let numCols = squares[0].length;
        let content = "";
        let indices = [];
        if(rowIndex-1 >= 0)
        {
            content = (squares[rowIndex-1][colIndex] === "on" ? "off" : "on");
            indices.push([rowIndex-1, colIndex, content]);
        }
        if(rowIndex+1 < numRows)
        {
            content = (squares[rowIndex+1][colIndex] === "on" ? "off" : "on");
            indices.push([rowIndex+1, colIndex, content]);
        }
        if(colIndex-1 >= 0)
        {
            content = (squares[rowIndex][colIndex-1] === "on" ? "off" : "on");
            indices.push([rowIndex, colIndex-1, content]);
        }
        if(colIndex+1 < numCols)
        {
            content = (squares[rowIndex][colIndex+1] === "on" ? "off" : "on");
            indices.push([rowIndex, colIndex+1, content]);
        }
        content = (squares[rowIndex][colIndex] === "on" ? "off" : "on");
        indices.push([rowIndex, colIndex, content]);
        return indices;
    }

    isGameComplete(squares)
    {
        let numRows = squares.length;
        let numCols = squares[0].length;
        let status = true;
        for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            for(let colIndex = 0; colIndex < numCols; colIndex++)
            {
                if(squares[rowIndex][colIndex] !== "off")
                {
                    status = false; break;
                }
            }
            if(status === false) { break; }
        }
        return status;
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    updateBoard(rowIndex, colIndex)
    {
        const boardHistory = this.state.boardHistory.slice(0, this.state.stepNumber + 1);
        const moveHistory = this.state.moveHistory.slice(0, this.state.stepNumber + 1);
        const currentBoard = boardHistory[boardHistory.length - 1];
        const currentSquares = currentBoard.squares.slice();
        // If winner is already declared or the square in the board is unoccupied, do not change the board
        if (this.state.winner)
        {
            return;
        }
        let changedSquares = this.changeSquares(currentSquares, rowIndex, colIndex);
        let numTurnedOffSquares = this.state.numSquaresTurnedOff;
        for(let index = 0; index < changedSquares.length; index++)
        {
            let rowIndex = changedSquares[index][0];
            let colIndex = changedSquares[index][1];
            let content = changedSquares[index][2];
            currentSquares[rowIndex][colIndex] = content;
            if(content === "off")
            {
                numTurnedOffSquares = numTurnedOffSquares + 1;
            }
            else
            {
                numTurnedOffSquares = numTurnedOffSquares - 1;
            }
        }
        let winner = this.isGameComplete(currentSquares);
        this.setState({
            boardHistory: boardHistory.concat([{
                squares: currentSquares,
            }]),
            moveHistory: moveHistory.concat([{
                message: "Move " + parseInt(this.state.stepNumber + 1, 10) + ": Placed " + 
                            currentSquares[rowIndex][colIndex] + " at (" + rowIndex + ", " + colIndex + ")",
            }]),
            numSquaresTurnedOff: numTurnedOffSquares,
            stepNumber: boardHistory.length,
            winner: winner,
        });
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    handleClick(rowIndex, colIndex)
    {
        const isBoardTurnedOff = (this.state.numSquaresTurnedOff ===
                                (this.config.numRows*this.config.numCols));
        if(isBoardTurnedOff === true) {return;}
        this.updateBoard(rowIndex, colIndex);
    }

    /**
     * @brief - Determines how all the components of the board should be rendered
     */
    render()
    {
        const currentBoard= this.state.boardHistory[this.state.boardHistory.length-1];
        let status = "";
        if(this.state.winner)
        {
            status = "Winner";
        }
        return (
            <div className="game">
                {/* Title and version of the game */}
                <div className="game-title">
                    <span>{this.props.title}</span>
                    <span style={version}>{this.props.version}</span>
                </div>
                {/* Game board, form and moves */}
                <div className="game-box">
                    <div className="game-board">
                        {/* Game board contains board as well as form 
                            for submitting game config */}
                        <Board 
                            numRows={this.config.numRows}
                            numCols={this.config.numCols}
                            squares={currentBoard.squares}
                            status={status}
                            onClick={(rowIndex, colIndex) => this.handleClick(rowIndex, colIndex)}
                        />
                        <GameForm 
                            handleFromGame={this.handleFromGameInfo}
                            handleForNewGame={this.handleNewGame}
                        />
                    </div>
                    {/* Information regarding game moves */}
                    <div className="game-info">
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;