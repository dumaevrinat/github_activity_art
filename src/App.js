import React, {useState} from 'react'
import Context from './context'

import copy from 'copy-to-clipboard'
import boardTemplates from './boardTemplatesData'
import {getSquares, generateCode, getCommandsWindows, getCommandsLinux} from './utils'

import BoardTemplatesCarousel from './components/BoardTemplatesCarousel/BoardTemplatesCarousel'
import Settings from "./components/Settings/Settings";
import Board from './components/Board/Board'


export default function App() {
    const date = new Date();
    date.setDate(date.getDate() - 365 - date.getDay() + 1);

    const startDate = date;
    const colors= ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];

    const [selectedType, setSelectedType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedOS, setSelectedOS] = useState(0);
    const [maxCommitCount, setMaxCommitCount] = useState(10);
    const [squares, setSquares] = useState(getSquares(date));
    const [generatedCode, setGeneratedCode] = useState(undefined);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const paintSquare = (i) => {
        const newSquares = squares.slice();
        newSquares[i] = {
            date: squares[i].date,
            type: selectedType
        };

        setSquares(newSquares);
    };

    const paintSquareContinuously = (i) => {
        if (isMouseDown) {
            paintSquare(i);
        }
    };

    const paintSquareAndSetSelectedDate = (i) => {
        const selectedDate = squares[i].date;

        if (isMouseDown) {
            paintSquare(i);
            setSelectedDate(selectedDate);
        } else {
            setSelectedDate(selectedDate);
        }
    };

    const setBoardTemplate = (i) => {
        const templateSquaresTypes = boardTemplates[i].squaresTypes;

        const newSquares = squares.slice().map((square, index) => {
                return {
                    date: square.date,
                    type: templateSquaresTypes[index]
                };
            }
        );

        setSquares(newSquares);
    };

    const clearBoard = () => {
        const newSquares = squares.slice().map((square) => {
                return {
                    date: square.date,
                    type: 0
                };
            }
        );

        setSquares(newSquares);
    };

    const generateScript = () => {
        let generatedCode;

        switch (selectedOS) {
            case 0:
                generatedCode = generateCode(squares, maxCommitCount, getCommandsWindows);
                break;
            case 1:
                generatedCode = generateCode(squares, maxCommitCount, getCommandsLinux);
                break;
        }
        setGeneratedCode(generatedCode);
    };

    return (
        <Context.Provider value={{
            setSelectedType,
            setSelectedDate,
            setSelectedOS,
            setMaxCommitCount,
            setIsMouseDown,
            setBoardTemplate,
            paintSquareContinuously,
            paintSquare
        }}>
            <div className='app' onMouseUp={() => setIsMouseDown(false)}>
                <h3>Примеры</h3>
                <BoardTemplatesCarousel
                    boardTemplates={boardTemplates}
                />

                <h3>Настройки</h3>
                <Settings
                    selectedType={selectedType}
                    colors={colors}
                    maxCommitCount={maxCommitCount}
                    selectedOS={selectedOS}
                    startDate={startDate}
                    selectedDate={selectedDate}
                />

                <Board
                    squares={squares}
                    colors={colors}
                />

                <div className='boardButtons'>
                    <button className='clearButton' onClick={() => clearBoard()}>
                        Очистить
                    </button>

                    <button className='generateButton' onClick={() => generateScript()}>
                        Сгенерировать
                    </button>

                    <button className='copyButton' onClick={() => copy(generatedCode)}>
                        Скопировать
                    </button>
                </div>

                <h3>Скрипт</h3>
                <div className='block'>
                    <textarea
                        className='generatedCode'
                        value={generatedCode}
                        readOnly
                        disabled={true}>
                    </textarea>
                </div>
            </div>
        </Context.Provider>
    )
}
