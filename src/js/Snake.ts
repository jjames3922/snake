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
      // 如果 startTime 是 0 就在使用者點下按鍵時，將開始時間設定成「現在時間」
      if (this._startTime === 0) {
        this._startTime = new Date().getTime();
      }
      const snakeHead = this._snakeBodyLocation[0];
      switch (e.key) {
          case 'ArrowRight':
            if (snakeHead.direction !== Direction.Left) {
              snakeHead.direction = Direction.Right; // 將 snake head 設定為當下點下的方向
              requestAnimationFrame(this.move.bind(this));  
            }
            break;
          case 'ArrowUp':
            if (snakeHead.direction !== Direction.Down) {
              snakeHead.direction = Direction.Up; // 將 snake head 設定為當下點下的方向
              requestAnimationFrame(this.move.bind(this));  
            }
            break;
          case 'ArrowLeft':
            if (snakeHead.direction !== Direction.Right) {
              snakeHead.direction = Direction.Left; // 將 snake head 設定為當下點下的方向
              requestAnimationFrame(this.move.bind(this));  
            }
            break;
          case 'ArrowDown':
            if (snakeHead.direction !== Direction.Up) {
              snakeHead.direction = Direction.Down; // 將 snake head 設定為當下點下的方向
              requestAnimationFrame(this.move.bind(this));  
            }
            break;
          default:
              break;
      }
    })
  }

  public move () {
    // 每 500 秒執行一次
    if (new Date().getTime() - this._startTime > 150) {
      this._startTime = new Date().getTime();
      const snakeHead = { ...this._snakeBodyLocation[0] };
      const snakeBodyLocationLength = this._snakeBodyLocation.length;
      this._snakeBodyLocation.splice(snakeBodyLocationLength - 1); // 截掉最後一個蛇的身體

      // 更換掉頭的位置
      if (snakeHead.direction === Direction.Down) {
        snakeHead.y++;
      } else if (snakeHead.direction === Direction.Up) {
        snakeHead.y--;
      } else if (snakeHead.direction === Direction.Left) {
        snakeHead.x--;
      } else if (snakeHead.direction === Direction.Right) {
        snakeHead.x++;
      }
      this._snakeBodyLocation.unshift(snakeHead); // 將新的頭的位置加入到陣列開頭
      this._snakeBodyLocation.forEach((location, i) => { // 刷新所有身體位置
        this._gameMap.checkSnakeMove(location); // 檢查蛇的身體是否有超出地圖, 由地圖將蛇的身體轉回地圖
        this._snakeBody[i].style.transform = `translate(${location.x * 40}px, ${location.y * 40}px)`;
      });

      this.checkEatFood(); // 檢查是否在每一次移動有吃到食物
      this.checkCollision(); // 檢查是否有碰撞到自己身體
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
    this._gameMap.drawScore(this._score);
  }

  checkEatFood () {
    const foodLocation = this._food.getFoodLocation();
    const snakeHead = this._snakeBodyLocation[0];
    if (snakeHead.x === foodLocation.x && snakeHead.y === foodLocation.y) {
      this.addSnakeBody();
      this.addScore();
      this._food.init(); // 重新產生一次食物
    }
  }

  checkCollision () {
    // 檢查有沒有撞到自己
    const snakeHead = this._snakeBodyLocation[0];
    this._snakeBodyLocation.forEach((location, i) => {
      if (i > 0) {
        if (location.x === snakeHead.x && location.y === snakeHead.y) {
          document.location.href = './end.html'
        }
      }
    })
  }
}