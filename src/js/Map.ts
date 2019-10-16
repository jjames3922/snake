import { Snake } from './Snake';

type StartPoint = {
  x: number,
  y: number
}

export class GameMap {
  private _row: number;
  private _col: number;
  private _gameMap: HTMLElement

  constructor (row: number, col: number) {
    this._row = row;
    this._col = col;
  }

  init () {
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
}