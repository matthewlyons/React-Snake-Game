import React, { Component } from 'react';
import Cell from './Cell';

export default class PlayArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [
        [25, 25],
        [25, 26],
        [25, 27],
        [25, 28]
      ],
      food: [11, 20],
      direction: 38,
      dead: false
    };
    this.reset = this.reset.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.moveFood = this.moveFood.bind(this);
  }

  reset() {
    this.setState({
      snake: [
        [25, 25],
        [25, 26],
        [25, 27],
        [25, 28]
      ],
      food: [11, 20],
      direction: 38,
      dead: false
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.moveSnake(), 130);
  }

  changeDirection({ keyCode }) {
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      let changeDirection = true;
      [
        [38, 40],
        [37, 39]
      ].forEach((dir) => {
        if (
          dir.indexOf(this.state.direction) > -1 &&
          dir.indexOf(keyCode) > -1
        ) {
          changeDirection = false;
        }
      });

      if (changeDirection) this.setState({ direction: keyCode });
    }
  }

  moveFood() {
    let newFood = [
      Math.floor(Math.random() * (this.props.width + 1)),
      Math.floor(Math.random() * (this.props.height + 1))
    ];

    this.setState({ food: newFood });
  }

  moveSnake() {
    let { direction, food } = this.state;
    let newSnake = this.state.snake;
    let snakeHead = newSnake[0];
    if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
      this.moveFood();
    } else {
      newSnake.pop();
    }

    if (direction === 37) {
      newSnake.unshift([snakeHead[0] - 1, snakeHead[1]]);
    } else if (direction === 38) {
      newSnake.unshift([snakeHead[0], snakeHead[1] - 1]);
    } else if (direction === 39) {
      newSnake.unshift([snakeHead[0] + 1, snakeHead[1]]);
    } else if (direction === 40) {
      newSnake.unshift([snakeHead[0], snakeHead[1] + 1]);
    }
    this.setState({ snake: newSnake }, () => {
      this.checkEdge();
    });
  }

  checkEdge() {
    let { snake } = this.state;

    let snakeHead = snake[0];
    if (
      snakeHead[0] < 0 ||
      snakeHead[1] < 0 ||
      snakeHead[0] > this.props.width ||
      snakeHead[1] > this.props.width
    ) {
      this.setState({ dead: true });
    }
  }

  render() {
    let width = this.props.width;
    let height = this.props.height;

    let cellHeight = Array.from(Array(height).keys());
    let cellWidth = Array.from(Array(width).keys());

    const cells = cellHeight.map((y) => {
      return cellWidth.map((x) => {
        const foodCell = this.state.food[0] === x && this.state.food[1] === y;

        let snakeCell = this.state.snake.filter(
          (c) => c[0] === x && c[1] === y
        );

        snakeCell = snakeCell.length > 0;

        return (
          <Cell foodCell={foodCell} snakeCell={snakeCell} key={x + ' ' + y} />
        );
      });
    });

    return (
      <div
        className='snake-app'
        onKeyDown={this.changeDirection}
        ref={(el) => (this.el = el)}
        tabIndex={-1}
      >
        {this.state.dead ? (
          <div className='GameOver'>
            <h1>You Died</h1>
            <button onClick={this.reset}>Reset</button>
          </div>
        ) : (
          <div
            className='grid'
            style={{
              width: width * 15 + 'px',
              height: height * 15 + 'px'
            }}
          >
            {cells}
          </div>
        )}
      </div>
    );
  }
}
