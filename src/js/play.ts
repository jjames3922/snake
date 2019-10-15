import '../scss/all.scss';
import { GameMap } from './Map';
import { Snake } from './Snake';

let target = null;
let snake = [];
let direction = { 
    horizontal: null,
    vertical: null 
}

const generateSnake = function() {
    if (snake.length === 0) {
        const snakeHead = {
            
        }
    }
};

(function(){
    const _gameMap = new GameMap(16, 28);
    const _snake = new Snake(_gameMap);
    _gameMap.init(); // 初始化地圖
    _snake.init(); // 初始化蛇的位置
    

    // const { x, y } = generateStartPoint()
    // target = playMap.querySelectorAll('.playMap__item')[y * 28 + x] as HTMLElement;
    // console.log(target.offsetTop, target);
    // console.log(target.offsetLeft);
    // target.style.backgroundColor = "#00FFE2";

}());

const moveSnake = function() {
    setInterval(() => {
        if (direction.horizontal > 0) {
            console.log('enter', target);
            target.style.transform = `translate(${30}px, 0px)`
        }
    }, 800);
}

window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowRight':
            if (direction.vertical !== 0) {
                direction.horizontal = 1;
                direction.vertical = 0;
                moveSnake();
            }
            break;
        case 'ArrowUp':
            if (direction.horizontal !== 0) {
                direction.horizontal = 0;
                direction.vertical = 1;
                moveSnake();
            }
            break;
        case 'ArrowLeft':
            if (direction.vertical !== 0) {
                direction.horizontal = -1;
                direction.vertical = 0;
                moveSnake();
            }
            break;
        case 'ArrowDown':
            if (direction.horizontal !== 0) {
                direction.horizontal = 0;
                direction.vertical = -1;
                moveSnake();
            }
            break;
        default:
            break;
    }
})