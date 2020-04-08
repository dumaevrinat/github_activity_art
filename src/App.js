import React from 'react';
import Board from './components/Board/Board'
import ColorPalette from './components/ColorPalette/ColorPalette'
import BoardTemplatesCarousel from './components/BoardTemplatesCarousel/BoardTemplatesCarousel'
import copy from 'copy-to-clipboard'
import boardTemplates from './boardTemplatesData'

class App extends React.Component {
    constructor(props) {
        super(props);

        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 365 - startDate.getDay() + 1);

        let squares = new Array(53 * 7);

        for (let i = 0; i < squares.length; i += 1) {
            let dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + i);
            squares[i] = {
                date: dayDate,
                type: 0,
            }
        }

        this.state = {
            selectedType: 1,
            selectedDate: undefined,
            selectedOS: 0,
            colors: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
            maxCommitCount: 10,
            startDate: startDate,
            squares: squares,
            generatedCode: undefined,
            isMouseDown: false,
            boardTemplates: boardTemplates
        };
    }

    handleMouseDownSquare(i) {
        const squares = this.state.squares.slice();
        squares[i] = {
            date: this.state.squares[i].date,
            type: this.state.selectedType
        };

        this.setState({
            squares: squares,
            isMouseDown: true
        })
    }

    handleMouseUp() {
        this.setState({
            isMouseDown: false
        })
    }

    handleMouseOverSquare(i) {
        const selectedDate = this.state.squares[i].date;

        if (this.state.isMouseDown) {
            const squares = this.state.squares.slice();
            squares[i] = {
                date: this.state.squares[i].date,
                type: this.state.selectedType
            };
            this.setState({
                squares: squares,
                selectedDate: selectedDate
            });
        } else {
            this.setState({
                selectedDate: selectedDate
            })
        }
    }

    handleMouseOutSquare() {
        this.setState({
            selectedDate: undefined,
        })
    }

    handleMouseLeaveBoard() {
        this.setState({
            isMouseDown: false
        })
    }

    handleOnClickColorButton(i) {
        this.setState({
            selectedType: i,
        })
    }

    handleOnClickGenerateButton() {
        let generatedCode;

        switch (this.state.selectedOS) {
            case 0:
                generatedCode = generateCode(this.state.squares, this.state.maxCommitCount, getCommandsWindows);
                break;
            case 1:
                generatedCode = generateCode(this.state.squares, this.state.maxCommitCount, getCommandsLinux);
                break;
        }

        this.setState({
            generatedCode: generatedCode,
        });
    }

    handleOnClickClearButton() {
        const squares = this.state.squares.slice();
        const newSquares = squares.map((square) => {
                return {
                    date: square.date,
                    type: 0
                };
            }
        );

        this.setState({
            squares: newSquares,
            generatedCode: ''
        });
    }

    handleCopyToClipboard() {
        copy(this.state.generatedCode)
    }

    handleOnClickBoardTemplate(i) {
        const squares = this.state.squares.slice();
        const templateSquaresTypes = this.state.boardTemplates[i].squaresTypes;

        const newSquares = squares.map((square, index) => {
                return {
                    date: square.date,
                    type: templateSquaresTypes[index]
                };
            }
        );

        this.setState({
            squares: newSquares
        })
    }

    handleOnChangeOSInput(event) {
        let value = parseInt(event.target.value);

        this.setState({
            selectedOS: value
        })
    }

    handleOnInputMaxCommitCount(event) {
        this.setState({
            maxCommitCount: event.target.value
        })
    }

    render() {
        return (
            <div className='app' onMouseUp={() => this.handleMouseUp()}>
                <h3>Примеры</h3>

                <BoardTemplatesCarousel
                    boardTemplates={this.state.boardTemplates}
                    handleOnClickBoardTemplate={(i) => this.handleOnClickBoardTemplate(i)}
                />

                <h3>Настройки</h3>

                <div className='settings'>
                    <div className='colorSettings'>
                        <ColorPalette
                            colors={this.state.colors}
                            selectedType={this.state.selectedType}
                            handleOnClickColorButton={(i) => this.handleOnClickColorButton(i)}
                        />

                        <div className='settingsDescription'>
                            Цвет
                        </div>
                    </div>

                    <div className='maxCommitSettings'>
                        <input
                            className='maxCommitInput'
                            type='number'
                            defaultValue={this.state.maxCommitCount}
                            max={100}
                            min={10}
                            step={1}
                            onInput={(event) => this.handleOnInputMaxCommitCount(event)}
                        />
                        <div className='settingsDescription'>
                            Максимальное кол-во коммитов
                        </div>
                    </div>

                    <div className='OSSettings'>
                        <select
                            value={this.state.selectedOS}
                            className='OSSelect'
                            onChange={(event) => this.handleOnChangeOSInput(event)}
                        >
                            <option value={0}>windows</option>
                            <option value={1}>linux & macos</option>
                        </select>
                        <div className='settingsDescription'>
                            Операционная система
                        </div>
                    </div>

                    <div className='dateSettings'>
                        <div className='date'>
                            <div className='dateValue'>
                                {this.state.startDate.toLocaleDateString()}
                            </div>
                            <div className='settingsDescription'>
                                Начальная дата
                            </div>
                        </div>

                        <div className='date'>
                            <div className='dateValue'>
                                {this.state.selectedDate ? this.state.selectedDate.toLocaleDateString() : '...'}
                            </div>
                            <div className='settingsDescription'>
                                Выбранная дата
                            </div>
                        </div>
                    </div>
                </div>

                <Board
                    squares={this.state.squares}
                    colors={this.state.colors}
                    handleMouseOverSquare={(i) => this.handleMouseOverSquare(i)}
                    handleMouseOutSquare={(i) => this.handleMouseOutSquare(i)}
                    handleMouseDownSquare={(i) => this.handleMouseDownSquare(i)}
                    handleMouseLeaveBoard={() => this.handleMouseLeaveBoard()}
                />

                <div className='boardButtons'>
                    <button className='clearButton' onClick={() => this.handleOnClickClearButton()}>
                        Очистить
                    </button>

                    <button className='generateButton' onClick={() => this.handleOnClickGenerateButton()}>
                        Сгенерировать
                    </button>

                    <button className='copyButton' onClick={() => this.handleCopyToClipboard()}>
                        Скопировать
                    </button>
                </div>

                <h3>Скрипт</h3>

                <div className='generatedCodeContainer'>
                    <textarea
                        className='generatedCode'
                        value={this.state.generatedCode}
                        readOnly
                        disabled={true}>
                    </textarea>
                </div>
            </div>
        )
    }
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

export default App;