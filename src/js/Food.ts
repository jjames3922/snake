import { Snake } from './Snake';
import { GameMap } from './Map';

interface FoodLocation {
    x: number,
    y: number
}

export class Food {
    private _gameMap: GameMap;
    private _snake: Snake;
    private _x: number;
    private _y: number;
    private _foodElement: HTMLElement;
    private _foodSideLength: number;

    constructor (snake: Snake, gameMap: GameMap) {
        this._snake = snake;
        this._gameMap = gameMap;
        this._foodSideLength = 40;
    }

    init () {
        this.generateFoodLocation();
        this.generateFood();
    }

    generateFoodLocation () {
        const snakeBodyLocation = this._snake.getSnakeBodyLocation();
        const startPoint = this._gameMap.generateStartPoint();
        const result = snakeBodyLocation.find(item => {
            return item.x === startPoint.x && item.y === startPoint.y
        })
        if (!result) {
            this._x = startPoint.x;
            this._y = startPoint.y;
        } else {
            this.generateFoodLocation()
        }
    }

    generateFood () {
        this._foodElement = document.createElement('div');
        this._foodElement.style.position = 'absolute';
        this._foodElement.style.background = 'red';
        this._foodElement.style.width = `${this._foodSideLength}px`;
        this._foodElement.style.height = `${this._foodSideLength}px`;
        this._foodElement.style.transform = `translate(${this._x * 40}px, ${this._y * 40}px)`;
        this._gameMap.drawFood(this._foodElement);
    }

    public getFoodLocation(): FoodLocation {
        return {
            x: this._x,
            y: this._y
        }
    }
}