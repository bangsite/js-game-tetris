import Board from './core/board.js';
import Brick from './core/brick.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const board = new Board(ctx);
board.drawBoard(1, 1, 1);

const brick = new Brick(board);

document.addEventListener('keydown', (event) => {
    if (board.gameOver) {
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
            brick.moveLeft();
            break;
        case 'ArrowRight':
            brick.moveRight();
            break;
        case 'ArrowDown':
            brick.moveDown();
            break;
        case 'ArrowUp':
            brick.rotate();
            break;
    }
});

document.getElementById('play').addEventListener('click', () => {
    board.reset();
    brick.reset();

    const refreshBrick = setInterval(() => {
        brick.moveDown();
    }, 1000);

    if (board.gameOver) {
        clearInterval(refreshBrick);
    }
});

document.getElementById('pause').addEventListener('click', () => {
});

document.getElementById('resume').addEventListener('click', () => {
    refreshBrick = setInterval(() => {
        brick.moveDown();
    }, 1000);
});

document.getElementById('reset').addEventListener('click', () => {
    board.reset();
    brick.reset();
});


console.table(board.grid);
