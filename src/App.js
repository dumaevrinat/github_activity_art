import React from 'react';
import Board from './components/Board/Board'
import ColorPalette from './components/ColorPalette/ColorPalette'
import './App.css'

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
                bgColor: '#ebedf0',
                date: dayDate,
                type: 0,
            }
        }

        this.state = {
            selectedType: 4,
            colors: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
            commitsCount: [0, 2, 5, 7, 10],
            status: ' ',
            startDate: startDate,
            squares: squares,
            generatedCode: undefined,
            isMouseDown: false
        };
    }

    handleMouseDownSquare(i) {
        const squares = this.state.squares.slice();
        squares[i] = {
            bgColor: this.state.colors[this.state.selectedType],
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

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     squares[i] = {
    //         bgColor: this.state.colors[this.state.selectedType],
    //         date: this.state.squares[i].date,
    //         type: this.state.selectedType
    //     };
    //     this.setState({
    //         squares: squares,
    //     });
    // }

    handleMouseOverSquare(i) {
        const status = this.state.squares[i].date.toLocaleDateString();

        if (this.state.isMouseDown) {
            const squares = this.state.squares.slice();
            squares[i] = {
                bgColor: this.state.colors[this.state.selectedType],
                date: this.state.squares[i].date,
                type: this.state.selectedType
            };
            this.setState({
                squares: squares,
                status: status
            });
        } else {
            this.setState({
                status: status
            })
        }
    }

    handleMouseOutSquare() {
        this.setState({
            status: ' ',
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

        this.setState({
            generatedCode: generatedCode,
        });
    }

    handleOnClickClearButton() {
        const squares = this.state.squares.slice();
        const newSquares = squares.map((square) => {
                return {
                    bgColor: this.state.colors[0],
                    date: square.date
                };
            }
        );

        this.setState({
            squares: newSquares,
        });
    }


    render() {
        return (
            <div className='app' onMouseUp={() => this.handleMouseUp()}>
                <ColorPalette
                    colors={this.state.colors}
                    selectedType={this.state.selectedType}
                    handleOnClickColorButton={(i) => this.handleOnClickColorButton(i)}
                />

                <div className='dates'>
                    <div className='startDate'>
                        {'Начальная дата: ' + this.state.startDate.toLocaleDateString()}
                    </div>

                    <div className='status'>
                        {'Выбранная дата: ' + this.state.status}
                    </div>
                </div>


                <button className='clearButton' onClick={() => this.handleOnClickClearButton()}>
                    Очистить
                </button>

                <button className='generateButton' onClick={() => this.handleOnClickGenerateButton()}>
                    Сгенерировать
                </button>

                    <Board
                        squares={this.state.squares}
                        //handleClick={(i) => this.handleClick(i)}
                        handleMouseOverSquare={(i) => this.handleMouseOverSquare(i)}
                        handleMouseOutSquare={(i) => this.handleMouseOutSquare(i)}
                        handleMouseDownSquare={(i) => this.handleMouseDownSquare(i)}
                        handleMouseLeaveBoard={() => this.handleMouseLeaveBoard()}
                    />

                <textarea value={this.state.generatedCode}>
                </textarea>
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