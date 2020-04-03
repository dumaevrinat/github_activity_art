import React from "react";

function Square(props) {
    return (
        <button
            className="square"
            //onClick={props.onClick}
            onMouseOver={props.onMouseOverSquare}
            onMouseOut={props.onMouseOutSquare}
            onMouseDown={props.onMouseDownSquare}
            style={props.style}
            date={props.date}
        >
        </button>
    )
}

export default Square;