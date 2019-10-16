import '../scss/all.scss';
import { GameMap } from './Map';
import { Snake } from './Snake';
import { Food } from './Food';

(function(){
    const _gameMap = new GameMap(16, 28);
    const _snake = new Snake(_gameMap);
    const _food = new Food(_snake, _gameMap);
    _snake.setFood(_food);
    _gameMap.init(); // 初始化地圖
    _snake.init(); // 初始化蛇的位置
    _food.init(); // 初始化食物的位置
}());