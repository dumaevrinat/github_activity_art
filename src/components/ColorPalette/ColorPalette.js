import React from 'react';

function ColorPalette(props){
    const renderColorButton = (i) => {
        let style = {};
        style.backgroundColor = props.colors[i];

        return (
            <button
                key={i}
                className={i === props.selectedType ? 'colorSelectedButton': 'colorButton'}
                style={style}
                onClick={() => props.handleOnClickColorButton(i)}>

            </button>
        )
    };

    return (
        <div className='colorPalette'>
            {props.colors.map((color, index) =>
                renderColorButton(index)
            )}
        </div>
    )
}

export default ColorPalette;