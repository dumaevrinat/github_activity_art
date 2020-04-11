import React, {useContext} from 'react';
import Context from '../../context'

export default function ColorPalette({colors, selectedType}){
    const {setSelectedType} = useContext(Context);

    return (
        <div className='colorPalette'>
            {colors.map((color, index) =>
                <button
                    key={index}
                    className={index === selectedType ? 'colorSelectedButton': 'colorButton'}
                    style={{backgroundColor: colors[index]}}
                    onClick={() => setSelectedType(index)}>
                </button>
            )}
        </div>
    )
}

