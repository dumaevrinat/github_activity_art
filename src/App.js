import React from 'react';
import Board from './components/Board/Board'
import ColorPalette from './components/ColorPalette/ColorPalette'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        let startDate = new Date();
        let squares = new Array(53 * 7);

        for (let i = 0; i < squares.length; i += 1) {
            let dayDate = new Date();
            dayDate.setDate(startDate.getDate() + i);

            squares[i] = {
                bgColor: '#ebedf0',
                date: dayDate,
            }
        }

        this.state = {
            selectedColor: 4,
            colors: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
            status: undefined,
            startDate: startDate,
            squares: squares,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = {
            bgColor: this.state.colors[this.state.selectedColor],
            date: this.state.squares[i].date,
        };
        this.setState({
            squares: squares,
        });
    }

    handleMouseOver(i) {
        const status = this.state.squares[i].date.toDateString();
        this.setState({
            status: status,
        })
    }

    handleMouseOut() {
        this.setState({
            status: '',
        })
    }

    handleOnClickColorButton(i) {
        this.setState({
            selectedColor: i,
        })
    }


    render() {
        return (
            <div className='app'>
                <ColorPalette
                    colors={this.state.colors}
                    selectedColor={this.state.selectedColor}
                    handleOnClickColorButton={(i) => this.handleOnClickColorButton(i)}
                />

                <div className='startDate'>
                    {'Start Date: ' + this.state.startDate}
                </div>

                <button className='clearButton' onClick={() => this.handleClearClick()}>
                    Clear
                </button>

                <Board
                    squares={this.state.squares}
                    handleClick={(i) => this.handleClick(i)}
                    handleMouseOver={(i) => this.handleMouseOver(i)}
                    handleMouseOut={() => this.handleMouseOut()}
                />

                <div className='status'>
                    {this.state.status}
                </div>
            </div>
        )
    }

    handleClearClick() {
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
}

export default App;