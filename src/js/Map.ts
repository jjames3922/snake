import { Snake } from './Snake';

// snake 的方向
enum Direction {
  Up = 1,
  Down,
  Right,
  Left
}

interface SnakeBodyLocation {
  x: number,
  y: number,
  direction?: Direction, // 現在行進方向
}
export class GameMap {
  private _row: number;
  private _col: number;
  private _gameMap: HTMLElement
  private _score: HTMLElement

  constructor (row: number, col: number) {
    this._row = row;
    this._col = col;
  }

  init () {
    this._score = document.querySelector('#playScore');
    const fragment = document.createDocumentFragment();
    this._gameMap = document.querySelector('.playMap');
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 28; j++) {
          const item = document.createElement('div');
          item.className = `playMap__item`;
          fragment.append(item);
      }
    }
    this._gameMap.appendChild(fragment);
  }

  generateStartPoint() {
    const x: number = Math.floor(Math.random() * this._col); // X 座標
    const y: number = Math.floor(Math.random() * this._row); // Y 座標
    return {
      x,
      y
    }
  }

  drawSnake (snake: Snake) {
    const snakeBody = snake.getSnakeBody()
    snakeBody.forEach(element => {
      this._gameMap.appendChild(element);
    })
  }

  drawFood (food: HTMLElement) {
    this._gameMap.appendChild(food);
  }

  // 繪製分數
  drawScore (score: number) {
    this._score.textContent = score.toString();
  }

  // 檢查蛇移動時是否有觸碰到地圖的邊界, 如果有的話由地圖回傳給蛇一個新的座標
  checkSnakeMove (snakeBodyLocation: SnakeBodyLocation) {
    if (
      snakeBodyLocation.x < 0 ||
      snakeBodyLocation.x > this._col -1 ||
      snakeBodyLocation.y < 0 ||
      snakeBodyLocation.y > this._row -1) {
        if (snakeBodyLocation.direction === Direction.Up) {
          snakeBodyLocation.y = this._row - 1;
        } else if (snakeBodyLocation.direction === Direction.Down) {
          snakeBodyLocation.y = 0;
        } else if (snakeBodyLocation.direction === Direction.Left) {
          snakeBodyLocation.x = this._col - 1;
        } else if (snakeBodyLocation.direction === Direction.Right) {
          snakeBodyLocation.x = 0;
        }
    }
  }
}