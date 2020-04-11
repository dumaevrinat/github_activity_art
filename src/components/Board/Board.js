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
                    {week.map((day, dayIndex) => {
                        const index = weekIndex * weekSize + dayIndex;
                        return (
                            <Square
                                key={index}
                                index={index}
                                date={squares[index].date}
                                style={{backgroundColor: colors[squares[index].type]}}
                            />
                        )
                    }
                    )}
                </div>
            )}
        </div>
    )
}