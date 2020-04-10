import React, {useState} from 'react'
import Context from './context'

import copy from 'copy-to-clipboard'
import boardTemplates from './boardTemplatesData'

import BoardTemplatesCarousel from './components/BoardTemplatesCarousel/BoardTemplatesCarousel'
import Settings from "./components/Settings/Settings";
import Board from './components/Board/Board'


export default function App() {
    const date = new Date();
    date.setDate(date.getDate() - 365 - date.getDay() + 1);

    const [selectedType, setSelectedType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedOS, setSelectedOS] = useState(0);
    const [colors, setColors] = useState(['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']);
    const [maxCommitCount, setMaxCommitCount] = useState(10);
    const [startDate, setStartDate] = useState(date);
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
            setBoardTemplate,
            setSelectedType,
            setSelectedDate,
            setSelectedOS,
            setMaxCommitCount,
            setIsMouseDown,
            paintSquareAndSetSelectedDate,
            paintSquare,
            squares
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
                <div className='generatedCodeContainer'>
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

function getSquares(date) {
    let squares = new Array(53 * 7);

    for (let i = 0; i < squares.length; i += 1) {
        let dayDate = new Date(date);
        dayDate.setDate(dayDate.getDate() + i);
        squares[i] = {
            date: dayDate,
            type: 0,
        }
    }

    return squares
}

function generateCode(squares, maxCommitCount, func) {
    let result = '';

    if (maxCommitCount > 100) {
        maxCommitCount = 100;
    }

    if (maxCommitCount < 10) {
        maxCommitCount = 10;
    }

    for (let i = 0; i < squares.length; i += 1) {
        let commitCount = Math.floor((squares[i].type / 4) * maxCommitCount);

        for (let j = 0; j < commitCount; j += 1) {
            result += func(squares[i].date);
        }
    }

    return result
}

function getCommandsWindows(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:01`;

    return `date --rfc-3339='ns' > file.txt \ngit add --all && GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m 'Graph Data ${dateString}'\n`
}

function getCommandsLinux(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:01`;

    return `cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1 > file.txt \ngit add --all && GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m 'Graph Data ${dateString}'\n`

}
