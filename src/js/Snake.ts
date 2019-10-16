import { GameMap } from './Map';
import { Food } from './Food';

// snake 的方向
enum Direction {
  Up,
  Down,
  Right,
  Left
}

// 蛇的身體資訊 (x 座標, y 座標, 方向)
interface SnakeBodyLocation {
  x: number,
  y: number,
  direction?: Direction
}

export class Snake {
  private _gameMap: GameMap; // 遊戲地圖
  private _snakeBody: HTMLElement[]; // snake DOM
  private _snakeSideLength: number; // 蛇的邊長
  private _snakeBodyLocation: SnakeBodyLocation[]; // 蛇的身體資訊
  private _startTime: number; // 紀錄蛇開始動的時間, 並用於 requestAnimationFrame
  private _food: Food;
  private _score: number; // 吃的分數

  constructor (gameMap: GameMap) {
    this._gameMap = gameMap;
    this._snakeSideLength = 40;
    this._snakeBody = [];
    this._snakeBodyLocation = [];
    this._startTime = 0;
    this._score = 0;
  }

  init () {
    const startPoint = this._gameMap.generateStartPoint(); // 產生蛇的預設位置
    const startPointDiv = document.createElement('div');
    startPointDiv.style.position = 'absolute';
    startPointDiv.style.background = '#00FFE2';
    startPointDiv.style.width = `${this._snakeSideLength}px`;
    startPointDiv.style.height = `${this._snakeSideLength}px`;
    // 因為還沒有點擊按鍵, 所以不會傳入方向
    this._snakeBodyLocation.push({
      x: startPoint.x,
      y: startPoint.y
    })
    startPointDiv.style.transform = `translate(${startPoint.x * 40}px, ${startPoint.y * 40}px)`;
    this._snakeBody.push(startPointDiv);
    this._gameMap.drawSnake(this);
    this.setKeyboardListener();
  }

  public getSnakeBody() {
    return this._snakeBody;
  }

  public getSnakeBodyLocation() {
    return this._snakeBodyLocation;
  }

  public setFood (food: Food) {
    this._food = food;
  }

  private setKeyboardListener() {
    window.addEventListener('keyup', e => {
      switch (e.key) {
          case 'ArrowRight':
            this._snakeBodyLocation[0].direction = Direction.Right;
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            requestAnimationFrame(this.move.bind(this, Direction.Right));
            break;
          case 'ArrowUp':
            this._snakeBodyLocation[0].direction = Direction.Up;
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            requestAnimationFrame(this.move.bind(this, Direction.Up));
            break;
          case 'ArrowLeft':
            this._snakeBodyLocation[0].direction = Direction.Left;
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            requestAnimationFrame(this.move.bind(this, Direction.Left));
            break;
          case 'ArrowDown':
            this._snakeBodyLocation[0].direction = Direction.Down;
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            requestAnimationFrame(this.move.bind(this, Direction.Down));
            break;
          default:
              break;
      }
    })
  }

  public move (direction: Direction) {
    if (new Date().getTime() - this._startTime > 500) {
      this._startTime = new Date().getTime();
      this._snakeBodyLocation.forEach((location, i) => {
        if (i !== this._snakeBodyLocation.length - 1) {
          this._snakeBodyLocation[i + 1].x = location.x;
          this._snakeBodyLocation[i + 1].y = location.y;
          this._snakeBodyLocation[i + 1].direction = location.direction;
        }
        if (i === 0) {
          if (location.direction === Direction.Down) {
            location.y++;
          } else if (location.direction === Direction.Up) {
            location.y--;
          } else if (location.direction === Direction.Left) {
            location.x--;
          } else if (location.direction === Direction.Right) {
            location.x++;
          }  
        } 
        // 檢查分數
        if (i === 0) { // 蛇的頭有吃到食物
          const foodLocation = this._food.getFoodLocation();
          if (location.x === foodLocation.x && location.y === foodLocation.y) {
            this.addSnakeBody();
            this.addScore();
          }
        }
        this._snakeBody[i].style.transform = `translate(${location.x * 40}px, ${location.y * 40}px)`;
      });
      this._gameMap.drawSnake(this);

    } 
    requestAnimationFrame(this.move.bind(this, this._snakeBodyLocation[0].direction));
  }

  addSnakeBody () {
    const newPointDiv = document.createElement('div');
    newPointDiv.style.position = 'absolute';
    newPointDiv.style.background = '#00FFE2';
    newPointDiv.style.width = `${this._snakeSideLength}px`;
    newPointDiv.style.height = `${this._snakeSideLength}px`;
    const lastBody = this._snakeBodyLocation[this._snakeBodyLocation.length - 1];
    if (lastBody.direction === Direction.Down) {
      this._snakeBodyLocation.push({
        x: lastBody.x,
        y: lastBody.y - 1,
        direction: Direction.Down
      })
    } else if (lastBody.direction === Direction.Up) {
      this._snakeBodyLocation.push({
        x: lastBody.x,
        y: lastBody.y + 1,
        direction: Direction.Up
      })
    } else if (lastBody.direction === Direction.Left) {
      this._snakeBodyLocation.push({
        x: lastBody.x + 1,
        y: lastBody.y,
        direction: Direction.Left
      })
    } else if (lastBody.direction === Direction.Right) {
      this._snakeBodyLocation.push({
        x: lastBody.x - 1,
        y: lastBody.y,
        direction: Direction.Right
      });
    }
    this._snakeBody.push(newPointDiv);
  }

  addScore () {
    this._score++;
  }
}