import React from "react";

function Square(props) {
    return (
        <button
            className="square"
            onMouseOver={props.onMouseOverSquare}
            onMouseOut={props.onMouseOutSquare}
            onMouseDown={props.onMouseDownSquare}
            style={props.style}
        >
        </button>
    )
}

export default Square;