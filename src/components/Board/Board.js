import React from 'react'
import Square from '../Square/Square'


function Board(props) {
    const renderSquare = (i) => {
        let styles = {};
        styles.backgroundColor = props.colors[props.squares[i].type];

        return (
            <Square
                key={i}
                style={styles}
                onMouseOverSquare={() => props.handleMouseOverSquare(i)}
                onMouseOutSquare={() => props.handleMouseOutSquare(i)}
                onMouseDownSquare={() => props.handleMouseDownSquare(i)}
            />
        )
    };

    const renderWeeks = () => {
        let weeks = [];
        const weekSize = 7;

        for (let i = 0; i < props.squares.length; i += weekSize) {
            weeks.push(props.squares.slice(i, i + weekSize));
        }

        return (
            <div className='board' onMouseLeave={props.handleMouseLeaveBoard}>
                {weeks.map((week, weekIndex) =>
                    <div className='week' key={weekIndex}>
                        {week.map((day, dayIndex) =>
                            renderSquare(weekIndex * weekSize + dayIndex)
                        )}
                    </div>
                )}
            </div>
        )
    };

    return (
        <>
            {renderWeeks()}
        </>
    )
}

export default Board;