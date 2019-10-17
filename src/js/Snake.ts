import { GameMap } from './Map';
import { Food } from './Food';

// snake 的方向
enum Direction {
  Up = 1,
  Down,
  Right,
  Left
}

// 蛇的身體資訊 (x 座標, y 座標, 方向)
interface SnakeBodyLocation {
  x: number,
  y: number,
  direction?: Direction, // 現在行進方向
}

export class Snake {
  private _gameMap: GameMap; // 遊戲地圖
  private _snakeBody: HTMLElement[]; // snake DOM
  private _snakeSideLength: number; // 蛇的邊長
  private _snakeBodyLocation: SnakeBodyLocation[]; // 蛇的身體資訊
  private _startTime: number; // 紀錄蛇開始動的時間, 並用於 requestAnimationFrame
  private _food: Food; // 食物的 instance
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

    // 預設產生蛇的頭
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

  // 蛇的身體 (DOM)
  public getSnakeBody() {
    return this._snakeBody;
  }

  // 蛇的身體資訊 (物件)
  public getSnakeBodyLocation() {
    return this._snakeBodyLocation;
  }

  // 設定蛇的食物
  public setFood (food: Food) {
    this._food = food;
  }

  private setKeyboardListener() {
    window.addEventListener('keyup', e => {
      // const snakeHead = this._snakeBodyLocation[0];
      // this._previousDirection = snakeHead.direction; // 更改頭的位置
      switch (e.key) {
          case 'ArrowRight':
            // this.checkChangeDirection(Direction.Right);
            // snakeHead.direction = Direction.Right; // 更改頭的位置
            // if (!snakeHead.previousDirection) {
            //   snakeHead.previousDirection = snakeHead.direction; // 更改頭的位置
            // }
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            this._currentDirection = Direction.Right;
            requestAnimationFrame(this.move.bind(this));
            break;
          case 'ArrowUp':
            // this.checkChangeDirection(Direction.Up);
            // snakeHead.direction = Direction.Up; // 更改頭的位置
            // if (!snakeHead.previousDirection) {
            //   snakeHead.previousDirection = snakeHead.direction; // 更改頭的位置
            // }
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            this._currentDirection = Direction.Up;
            requestAnimationFrame(this.move.bind(this));
            break;
          case 'ArrowLeft':
            // this.checkChangeDirection(Direction.Left);
            // snakeHead.direction = Direction.Left; // 更改頭的位置
            // if (!snakeHead.previousDirection) {
            //   snakeHead.previousDirection = snakeHead.direction; // 更改頭的位置
            // }
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            this._currentDirection = Direction.Left;
            requestAnimationFrame(this.move.bind(this));
            break;
          case 'ArrowDown':
            // this.checkChangeDirection(Direction.Down);
            // snakeHead.direction = Direction.Down; // 更改頭的位置
            // if (!snakeHead.previousDirection) {
            //   snakeHead.previousDirection = snakeHead.direction; // 更改頭的位置
            // }
            if (this._startTime === 0) {
              this._startTime = new Date().getTime();
            }
            break;
          default:
              break;
      }
    })
  }

  public move () {
    // 每 500 秒執行一次
    if (new Date().getTime() - this._startTime > 500) {
      this._startTime = new Date().getTime();
      const snakeHead = this._snakeBodyLocation[0];
      this._snakeBodyLocation.forEach((location, i) => {
        if (i > 0) {
          location.direction = this._snakeBodyLocation[i - 1].direction;  
          if (location.direction === Direction.Down) {
            location.y++;
          } else if (location.direction === Direction.Up) {
            location.y--;
          } else if (location.direction === Direction.Left) {
            location.x--;
          } else if (location.direction === Direction.Right) {
            location.x++;
          }
          this._snakeBody[i].style.transform = `translate(${location.x * 40}px, ${location.y * 40}px)`;
        }
        // if (!this._isChangeDirection) {
        // if (i > 0) {
        //   location.direction = this._previousDirection;
        // }
        // }
        // 如果不是頭，那把身體行走的方向設定為前一個部位前進的方向
        // if (i !== 0) {
        //   location.direction = this._snakeBodyLocation[i - 1].previousDirection;
        // }
        // 檢查分數
      });
      
      snakeHead.direction = this._currentDirection;
      if (snakeHead.direction === Direction.Down) {
        snakeHead.y++;
      } else if (snakeHead.direction === Direction.Up) {
        snakeHead.y--;
      } else if (snakeHead.direction === Direction.Left) {
        snakeHead.x--;
      } else if (snakeHead.direction === Direction.Right) {
        snakeHead.x++;
      }
      this._snakeBody[0].style.transform = `translate(${snakeHead.x * 40}px, ${snakeHead.y * 40}px)`;
      this.checkEatFood(); // 檢查是否在每一次移動有吃到食物
      this._gameMap.drawSnake(this);
    } 
    requestAnimationFrame(this.move.bind(this));
  }

  addSnakeBody () {
    const newPointDiv = document.createElement('div');
    newPointDiv.style.position = 'absolute';
    newPointDiv.style.background = '#00FFE2';
    newPointDiv.style.width = `${this._snakeSideLength}px`;
    newPointDiv.style.height = `${this._snakeSideLength}px`;

    let lastBody = this._snakeBodyLocation[this._snakeBodyLocation.length - 1];
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
    lastBody = this._snakeBodyLocation[this._snakeBodyLocation.length - 1];
    newPointDiv.style.transform = `translate(${lastBody.x * 40}px, ${lastBody.y * 40}px)`;
    this._snakeBody.push(newPointDiv);
  }

  addScore () {
    this._score++;
  }

  checkEatFood () {
    const foodLocation = this._food.getFoodLocation();
    const snakeHead = this._snakeBodyLocation[0];
    if (snakeHead.x === foodLocation.x && snakeHead.y === foodLocation.y) {
      this.addSnakeBody();
      this.addScore();
    }
  }
}