import React, {useContext} from "react"
import Context from '../../context'

export default function Square({index, style}) {
    const {paintSquareAndSetSelectedDate, paintSquare, setIsMouseDown, setSelectedDate} = useContext(Context);

    return (
        <button
            className="square"
            onMouseOver={() => paintSquareAndSetSelectedDate(index)}
            onMouseOut={() => setSelectedDate(undefined)}
            onMouseDown={() => {
                paintSquare(index);
                setIsMouseDown(true);
            }}
            style={style}
        >
        </button>
    )
}