import React from "react";
import "../styles/css/index.css";

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
        let squareClass = "square";
        if(this.props.value !== null)
        {
            squareClass += " on";
        }
        else
        {
            squareClass += " off";
        }
        return (
            <div 
                className={squareClass}
                onClick={() => this.props.onClick()}
            >
            </div>
        );
    }
}

export default Square;