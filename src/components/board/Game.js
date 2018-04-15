import React from "react";
import Board from "./Board";
import GameForm from "./GameForm";
import GameInfo from "./GameInfo";
import GameControls from "./GameControls";

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
        this.handleFromMoveOneStepBefore = this.handleFromMoveOneStepBefore.bind(this);
        this.handleFromMoveOneStepAfter = this.handleFromMoveOneStepAfter.bind(this);
        this.handleFromJump = this.handleFromJump.bind(this);
        // Configuration of the game board
        this.config = {
            numRows: 3,            // Number of rows in the board
            numCols: 3,            // Number of cols in the board
            puzzleLevel: "easy",   // Level of the puzzle
        };
        let board = this.createNewPuzzle(this.config.numRows, this.config.numCols);
        // Current state of the game
        this.state = {
            boardHistory: [{
                squares: board[0],         // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
            }],                            // History of moves on the board
            moveHistory: [{
                message: "Game start",
            }],                            // History of status messages regarding the game
            currentStepNumber: 0,          // Which move number?
            totalNoOfSteps: 0,             // Total number of moves completed
            currentBoardSquares: board[0],        // Current state of the board
            numSquaresTurnedOff: board[1], // How many squares have been filled currently?
            isPuzzleSolved: false,         // Determines if the puzzle has been solved?
        };
    }

    /**
     * @brief - Creates an empty 2D array
     * @param {*} numRows - Number of rows required for the board
     * @param {*} numCols - Number of columns required for the board
     */
    createNewPuzzle(numRows, numCols)
    {
        var board = new Array(numRows);
        var numTurnedOffSquares = 0;
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            board[rowIndex] = new Array(numCols);
            // Creating a board row
            for (let colIndex = 0; colIndex < numCols; colIndex++)
            {
                board[rowIndex][colIndex] = "on";
            }
        }
        let indices = [];
        let maxNumberOfSteps = 0;
        let numSteps = 0;
        if(this.config.puzzleLevel === "easy")
        {
            maxNumberOfSteps = 4;
            numSteps = Math.floor(Math.random() * maxNumberOfSteps);
        }
        else if(this.config.puzzleLevel === "medium")
        {
            maxNumberOfSteps = 10;
            numSteps = Math.floor(Math.random() * maxNumberOfSteps);
        }
        else if(this.config.puzzleLevel === "difficult")
        {
            maxNumberOfSteps = 15;
            numSteps = Math.floor(Math.random() * maxNumberOfSteps);
        }
        else
        {
            maxNumberOfSteps = 4;
            numSteps = Math.floor(Math.random() * maxNumberOfSteps);
        }
        for(let index = 0; index < numSteps; index++)
        {
            let row = Math.floor(Math.random() * (this.config.numRows));
            let col = Math.floor(Math.random() * (this.config.numCols));
            indices.push([row, col]);
        }
        let numOfMoves = indices.length;
        for(let index = 0; index < numOfMoves; index++)
        {
            let changedSquares = this.changeSquares(board, indices[index][0], indices[index][1]);
            for(let index = 0; index < changedSquares.length; index++)
            {
                let rowIndex = changedSquares[index][0];
                let colIndex = changedSquares[index][1];
                let content = changedSquares[index][2];
                board[rowIndex][colIndex] = content;
                if(content === "off")
                {
                    numTurnedOffSquares = numTurnedOffSquares + 1;
                }
                else
                {
                    numTurnedOffSquares = numTurnedOffSquares - 1;
                }
            }
        }
        return [board, numTurnedOffSquares];
    }

    /**
     * @brief - Set the game config sent by GameForm
     * @param {*} numRows - Number of rows for the board
     * @param {*} numCols - Number of cols for the board
     */
    handleFromGameInfo(numRows, numCols, puzzleLevel)
    {
        this.config.numRows = parseInt(numRows, 10); // Set the number of rows for the board
        this.config.numCols = parseInt(numCols, 10); // Set the number of cols for the board
        this.config.puzzleLevel = puzzleLevel; 
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
        let board = this.createNewPuzzle(this.config.numRows, this.config.numCols);
        // Resetting the game would mean setting the state of the board to what it
        // originally started with. Please see constructor for the original state
        // of the board
        this.setState({
            boardHistory: [{
                squares: board[0],
                // Removed polyfill as there was an array problem.
                // See: https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element?rq=1
            }],
            moveHistory: [{
                message: "Game start",
            }],
            currentStepNumber: 0,
            totalNoOfSteps: 0,
            currentBoardSquares: board[0],
            numSquaresTurnedOff: board[1],
            isPuzzleSolved: false,
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

    checkNumSquaresTurnedOff(squares)
    {
        let numRows = squares.length;
        let numCols = squares[0].length;
        let count = 0;
        for(let rowIndex = 0; rowIndex < numRows; rowIndex++)
        {
            for(let colIndex = 0; colIndex < numCols; colIndex++)
            {
                if(squares[rowIndex][colIndex] === "off")
                {
                    count = count + 1;
                }
            }
        }
        return count;
    }

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    updateBoard(rowIndex, colIndex)
    {
        let boardHistory = this.state.boardHistory.slice(0, this.state.currentStepNumber+1);
        let moveHistory = this.state.moveHistory.slice(0, this.state.currentStepNumber+1);
        let currentBoard = boardHistory[boardHistory.length - 1];
        let currentSquares = new Array(this.config.numRows);
        for (let rowIndex = 0; rowIndex < this.config.numRows; rowIndex++)
        {
            currentSquares[rowIndex] = currentBoard.squares[rowIndex].slice();
        }
        // If isPuzzleSolved is already declared or the square in the board is unoccupied, do not change the board
        if (this.state.isPuzzleSolved)
        {
            return;
        }
        let numTurnedOffSquares = this.state.numSquaresTurnedOff;
        let changedSquares = this.changeSquares(currentSquares, rowIndex, colIndex);
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
        let isPuzzleSolved = (numTurnedOffSquares === (this.config.numRows*this.config.numCols));
        this.setState({
            boardHistory: boardHistory.concat([{
                squares: currentSquares,
            }]),
            moveHistory: moveHistory.concat([{
                message: "Move " + parseInt(this.state.currentStepNumber + 1, 10) + ": Clicked " + 
                            " on (" + rowIndex + ", " + colIndex + ")",
            }]),
            numSquaresTurnedOff: numTurnedOffSquares,
            currentStepNumber: boardHistory.length,
            totalNoOfSteps: boardHistory.length,
            currentBoardSquares: currentSquares,
            isPuzzleSolved: isPuzzleSolved,
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
     * 
     * @param {*} step 
     */
    jumpTo(step)
    {
        let currentBoardSquares = this.state.boardHistory[step].squares;
        let numSquaresTurnedOff = this.checkNumSquaresTurnedOff(currentBoardSquares);
        this.setState({
            numSquaresTurnedOff: numSquaresTurnedOff,
            currentStepNumber: step,
            currentBoardSquares: currentBoardSquares,
            totalNoOfSteps: step,
            boardHistory: this.state.boardHistory.slice(0, step + 1),
            moveHistory: this.state.moveHistory.slice(0, step + 1),
        });
    }

    /**
     * 
     * @param {*} step 
     */
    handleFromMoveOneStepBefore()
    {
        let step = this.state.currentStepNumber - 1;
        if(step < 0)
        {
            return;
        }
        let currentBoardSquares = this.state.boardHistory[step].squares;
        let numSquaresTurnedOff = this.checkNumSquaresTurnedOff(currentBoardSquares);
        this.setState({
            numSquaresTurnedOff: numSquaresTurnedOff,
            currentStepNumber: step,
            currentBoardSquares: currentBoardSquares,
        });
    }

    handleFromJump()
    {
        let step = this.state.currentStepNumber;
        this.jumpTo(step);
    }

    /**
     * 
     * @param {*} step 
     */
    handleFromMoveOneStepAfter()
    {
        let step = this.state.currentStepNumber + 1;
        if(step > this.state.totalNoOfSteps)
        {
            return;
        }
        let currentBoardSquares = this.state.boardHistory[step].squares;
        let numSquaresTurnedOff = this.checkNumSquaresTurnedOff(currentBoardSquares);
        this.setState({
            numSquaresTurnedOff: numSquaresTurnedOff,
            currentStepNumber: step,
            currentBoardSquares: currentBoardSquares,
        });
    }

    /**
     * @brief - Determines how all the components of the board should be rendered
     */
    render()
    {
        const currentBoardSquares = this.state.currentBoardSquares;
        let status = "";
        if(this.state.isPuzzleSolved)
        {
            status = "Puzzle solved in " + this.state.currentStepNumber + " steps";
        }
        const moves = this.state.boardHistory.map((step, move) =>
        {
            const desc = this.state.moveHistory[move].message;
            return (
                <p key={"step" + move} className="game-move-item" onClick={() => this.jumpTo(move)}>{desc}</p>
            );
        });
        return (
            <div className="game">
                {/* Game board, form and moves */}
                <div className="game-box">
                    <div className="game-board">
                        <GameControls
                            moveBefore={this.handleFromMoveOneStepBefore}
                            moveNext={this.handleFromMoveOneStepAfter}
                            jump={this.handleFromJump}
                        />
                        {/* Game board contains board as well as form 
                            for submitting game config */}
                        <Board 
                            numRows={this.config.numRows}
                            numCols={this.config.numCols}
                            squares={currentBoardSquares}
                            status={status}
                            onClick={(rowIndex, colIndex) => this.handleClick(rowIndex, colIndex)}
                        />
                        <GameForm 
                            handleFromGame={this.handleFromGameInfo}
                            handleForNewGame={this.handleNewGame}
                        />
                    </div>
                    <GameInfo
                        moves={moves}
                    />
                    {/* Information regarding game moves */}
                    <div className="game-info">
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;