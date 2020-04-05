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
            selectedType: 4,
            colors: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
            commitsCount: [0, 2, 5, 7, 10],
            selectedDate: undefined,
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
        let generatedCode = generateCode(this.state.squares, this.state.commitsCount);

        // let generatedArrayString = this.state.squares.map((square) => {
        //     return square.type
        // });

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

    render() {
        return (
            <div className='app' onMouseUp={() => this.handleMouseUp()}>
                <h3>Шаблоны</h3>

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

                        <div className='colorPaletteDescription'>
                            Цвет
                        </div>
                    </div>

                    <div className='dates'>
                        <div className='date'>
                            <div className='dateValue'>
                                {this.state.startDate.toLocaleDateString()}
                            </div>
                            <div className='dateDescription'>
                                Начальная дата
                            </div>
                        </div>

                        <div className='date'>
                            <div className='dateValue'>
                                {this.state.selectedDate ? this.state.selectedDate.toLocaleDateString() : '...'}
                            </div>
                            <div className='dateDescription'>
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

function generateCode(squares, types) {
    let result = '';

    for (let i = 0; i < squares.length; i += 1) {
        for (let j = 0; j < types[squares[i].type]; j += 1) {
            result += getCommandsWindows(squares[i].date);
        }
    }

    return result
}

function getCommandsWindows(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:01`;

    return `date --rfc-3339='ns' > file.txt \ngit add --all && GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m 'Graph Data ${dateString}'\n`
}

export default App;