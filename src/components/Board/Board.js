import React, {useContext} from 'react'
import Context from '../../context'
import Square from '../Square/Square'


export default function Board({squares, colors}) {
    const {setIsMouseDown} = useContext(Context);

    let weeks = [];
    const weekSize = 7;

    for (let i = 0; i < squares.length; i += weekSize) {
        weeks.push(squares.slice(i, i + weekSize));
    }

    return (
        <div className='board' onMouseLeave={() => setIsMouseDown(false)}>
            {weeks.map((week, weekIndex) =>
                <div className='week' key={weekIndex}>
                    {week.map((day, dayIndex) =>
                        <Square
                            key={weekIndex * weekSize + dayIndex}
                            index={weekIndex * weekSize + dayIndex}
                            style={{backgroundColor: colors[squares[weekIndex * weekSize + dayIndex].type]}}
                        />
                    )}
                </div>
            )}
        </div>
    )
}