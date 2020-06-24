import React, {useContext} from "react"
import Context from '../../context'

export default function Square({index, date, style}) {
    const {paintSquareContinuously, paintSquare, setIsMouseDown, setSelectedDate} = useContext(Context);

    return (
        <button
            className="square"
            onMouseOver={() => {
                setSelectedDate(date);
                paintSquareContinuously(index)
            }}
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