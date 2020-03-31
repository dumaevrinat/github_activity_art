import React from 'react'
import Square from '../Square/Square'
import './Board.css'


function Board(props) {
    const renderSquare = (i) => {
        let styles = {};
        let date = props.squares[i].date;
        styles.backgroundColor = props.squares[i].bgColor;

        return (
            <Square
                key={i}
                style={styles}
                onClick={() => props.handleClick(i)}
                onMouseOver={() => props.handleMouseOver(i)}
                onMouseOut={() => props.handleMouseOut(i)}
                date={date}
            >
            </Square>
        )
    };

    const renderWeeks = () => {
        let weeks = [];
        const weekSize = 7;

        for (let i = 0; i < props.squares.length; i += weekSize){
            weeks.push(props.squares.slice(i, i + weekSize));
        }

        return (
            <div className='weeks'>
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
        <div>
            {renderWeeks()}
        </div>
    )
}

export default Board;