import { GameMap } from './Map';

export class Snake {
  private _gameMap: GameMap;
  private _snakeBody: HTMLElement[];
  private _snakeSideLength: number; // 蛇的邊長
  constructor (gameMap: GameMap) {
    this._gameMap = gameMap;
    this._snakeSideLength = 40;
    this._snakeBody = [];
  }

  init () {
    const startPoint = this._gameMap.generateStartPoint();
    const startPointDiv = document.createElement('div');
    startPointDiv.style.position = 'absolute';
    startPointDiv.style.background = '#00FFE2';
    startPointDiv.style.width = `${this._snakeSideLength}px`;
    startPointDiv.style.height = `${this._snakeSideLength}px`;
    startPointDiv.style.transform = `translate(${startPoint.x * 40}px, ${startPoint.y * 40}px)`;
    this._snakeBody.push(startPointDiv);
    this._gameMap.draw(this);
  }

  public getSnakeBody() {
    return this._snakeBody;
  } 
}