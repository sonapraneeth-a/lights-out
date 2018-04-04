import React from "react";
//import "../styles/css/index.css";

const square = {
    width: "1rem",
    height: "1rem",
    fontSize: "1rem",
    padding: "0.5rem",
    lineHeight: "1rem",
    border: "1px solid black"
}

const squareOn = {
    backgroundColor: "blue"
}

const squareOff = {
    backgroundColor: "white"
}

/**
 * @brief Square component of the board
 */
class Square extends React.Component
{
    /**
     * @brief Determines how the square in the board should be rendered
     */
    render()
    {
        let squareStyle = [];
        if(this.props.value === "on")
        {
            /* Reference: https://medium.com/@abhaytalreja/react-typeerror-css2properties-doesnt-have-an-indexed-property-setter-for-0-4acea43facd5 */
            squareStyle = Object.assign({}, square, squareOn);
        }
        else
        {
            squareStyle = Object.assign({}, square, squareOff);
        }
        return (
            <div 
                style={squareStyle}
                onClick={() => this.props.onClick()}
            >
            </div>
        );
    }
}

export default Square;