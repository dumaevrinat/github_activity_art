import React, {useState} from 'react'
import Context from './context'

import copy from 'copy-to-clipboard'
import boardTemplates from './boardTemplatesData'
import {getSquares, generateCode, getCommandsWindows, getCommandsLinux} from './utils'

import BoardTemplatesCarousel from './components/BoardTemplatesCarousel/BoardTemplatesCarousel'
import Settings from "./components/Settings/Settings";
import Board from './components/Board/Board'
import {useTranslation} from "react-i18next";


export default function App() {
    const date = new Date();
    date.setDate(date.getDate() - 365 - date.getDay() + 1);

    const startDate = date;
    const colors = ['#ebedf0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'];
    const OSCommands = [getCommandsWindows, getCommandsLinux];

    const [selectedType, setSelectedType] = useState(1);
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [selectedOS, setSelectedOS] = useState(0);
    const [maxCommitCount, setMaxCommitCount] = useState(10);
    const [squares, setSquares] = useState(getSquares(date));
    const [generatedCode, setGeneratedCode] = useState('');
    const [isMouseDown, setIsMouseDown] = useState(false);

    const { t } = useTranslation();

    const paintSquare = (i) => {
        const newSquares = squares.slice();
        newSquares[i].type = selectedType;
        setSquares(newSquares);
    };

    const paintSquareContinuously = (i) => {
        if (isMouseDown) {
            paintSquare(i);
        }
    };

    const setBoardTemplate = (i) => {
        const templateSquaresTypes = boardTemplates[i].squaresTypes();

        const newSquares = squares.map((square, index) => {
                square.type = templateSquaresTypes[index];
                return square;
            }
        );

        setSquares(newSquares);
    };

    const clear = () => {
        const newSquares = squares.map((square) => {
                square.type = 0;
                return square;
            }
        );

        setSquares(newSquares);
        setGeneratedCode('');
    };

    const generateScript = () => {
        const generatedCode = generateCode(squares, maxCommitCount, OSCommands[selectedOS]);
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
            <header>
                <div className="container">
                    <div className="header__logo">
                        GitHub Activity Art
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="description">
                    {t('project_description')}
                </div>

                <div className='app' onMouseUp={() => setIsMouseDown(false)}>
                    <h3>{t('examples')}</h3>
                    <BoardTemplatesCarousel
                        boardTemplates={boardTemplates}
                    />

                    <h3>{t('settings')}</h3>
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
                        <button className='generateButton' onClick={() => generateScript()}>
                            {t('generate')}
                        </button>

                        <button className='copyButton' onClick={() => copy(generatedCode)}>
                            {t('copy')}
                        </button>

                        <button className='clearButton' onClick={() => clear()}>
                            {t('clear')}
                        </button>
                    </div>

                    <h3>{t('script')}</h3>
                    <div className='block'>
                    <textarea
                        className='generatedCode'
                        value={generatedCode}
                        readOnly
                        disabled={true}>
                    </textarea>
                    </div>
                </div>

                <h3>{t('publication')}</h3>

                <div className="block publication">
                    <ul>
                        <li>
                            {t('create a repository')}
                        </li>
                        <li>
                            {t('clone a repository')}
                            <pre>git clone https://github.com/USERNAME/REPOSITORY NAME.git</pre>
                        </li>
                        <li>
                            {t('run the generated script')}
                        </li>
                        <li>
                            {t('push the changes in your local repository to github')}
                            <pre>git push -u origin master</pre>
                        </li>
                    </ul>
                </div>
            </div>

            <footer>
                <a href="https://github.com/dumaevrinat/github_activity_art">dumaevrinat/github_activity_art</a>
            </footer>
        </Context.Provider>
    )
}
