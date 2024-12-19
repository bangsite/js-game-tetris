
'use strict';

import { COLOR_MAPPING } from '../constants/color.js';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const WHITE_COLOR_ID = 7;


class Board {
    constructor(ctx) {
        this.rows = ROWS;
        this.cols = COLS;
        this.ctx = ctx;
        this.ctx.canvas.width = COLS * BLOCK_SIZE;
        this.ctx.canvas.height = ROWS * BLOCK_SIZE;

        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
    }

    generateWhiteBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    reset() {
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.drawBoard();
    }

    /**
     *
     * @param xAxis // xAxis => 1
     * @param yAxis // yAxis => 1
     * @param colorId
     */
    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.fillStyle = 'orange';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }

    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    handleCompletedRows() {
        let completeRows = this.grid.reduce((acc, row, index) => {
            if (row.every(cell => cell !== WHITE_COLOR_ID)) {
                acc.push(index);
            }
            return acc;
        }, []);

        completeRows.forEach(row => {
            this.grid.splice(row, 1);
            this.grid.unshift(Array(COLS).fill(WHITE_COLOR_ID));

        });

        if (completeRows.length) {
            this.handleScore();
        }

    }

    handleScore() {
        this.score += 10;
        document.getElementById('score').innerHTML = this.score
    }

    handleGameOver() {
        this.gameOver = true;
        alert('Game Over');
    }



}

export default Board;