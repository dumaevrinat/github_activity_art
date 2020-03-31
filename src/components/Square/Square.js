import React from "react";
import './Square.css'

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
            onMouseOut={props.onMouseOut}
            style={props.style}
            date={props.date}
        >
        </button>
    )
}

export default Square;