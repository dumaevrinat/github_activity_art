import React from 'react';
import './ColorPalette.css';

function ColorPalette(props){
    const renderColorButton = (i) => {
        let style = {};
        style.backgroundColor = props.colors[i];

        if (i === props.selectedType) {
            style.border = '2px solid black';
        }

        return (
            <button
                key={i}
                className='colorButton'
                style={style}
                onClick={() => props.handleOnClickColorButton(i)}>

            </button>
        )
    };

    return (
        <div className='colorPanel'>
            {props.colors.map((color, index) =>
                renderColorButton(index)
            )}
        </div>
    )
}

export default ColorPalette;