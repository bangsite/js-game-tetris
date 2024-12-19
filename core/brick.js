import { BRICK_LAYOUT } from "../constants/brick.js";
import { COLOR_MAPPING } from "../constants/color.js";

const COL_POSITION_DEFAULT = 0;
const ROW_POSITION_DEFAULT = 0;
const ACTIVE_INDEX_DEFAULT = 0;
const WHITE_COLOR_ID = 7;


class Brick {
    constructor(board) {
        this.id = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
        this.board = board;
        this.layout = BRICK_LAYOUT[this.id];
        this.activeIndex = ACTIVE_INDEX_DEFAULT;
        this.colPosition = COL_POSITION_DEFAULT;
        this.rowPosition = ROW_POSITION_DEFAULT;
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    this.board.drawCell(this.colPosition + col, this.rowPosition + row, this.id);
                }
            }

        }
    }

    generateNewRick() {
        this.colPosition = Math.floor(Math.random() * 7);
        this.rowPosition = ROW_POSITION_DEFAULT;
        console.log(this.activeIndex);

        this.id = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length; // create id anywhere between 0 to brickLayout.length
        this.layout = BRICK_LAYOUT[this.id];
        this.draw();
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    this.board.drawCell(this.colPosition + col, this.rowPosition + row, WHITE_COLOR_ID);
                }
            }

        }
    }

    reset() {
        this.colPosition = COL_POSITION_DEFAULT;
        this.rowPosition = ROW_POSITION_DEFAULT;
        this.activeIndex = ACTIVE_INDEX_DEFAULT;
        this.id = Math.floor(Math.random() * 10) % BRICK_LAYOUT.length;
        this.layout = BRICK_LAYOUT[this.id];
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPosition, this.colPosition - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPosition -= 1;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.rowPosition, this.colPosition + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPosition += 1;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPosition + 1, this.colPosition, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPosition += 1;
            this.draw();
            return;
        }

        this.handleLanded();
        if (!this.board.gameOver) this.generateNewRick();
    }

    rotate() {
        if (!this.checkCollision(this.rowPosition, this.colPosition, this.layout[(this.activeIndex + 1) % this.layout.length])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % this.layout.length;
            this.draw();
        }
    }

    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID && nextRow >= 0) {
                    if (col + nextCol < 0 ||
                        col + nextCol >= this.board.cols ||
                        row + nextRow >= this.board.rows ||
                        this.board.grid[row + nextRow][col + nextCol] !== WHITE_COLOR_ID) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    handleLanded() {
        if (this.rowPosition <= 0) {
            this.board.handleGameOver();
            return;
        }

        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    this.board.grid[this.rowPosition + row][this.colPosition + col] = this.id;
                }
            }
        }

        this.board.handleCompletedRows();
        this.board.drawBoard();
    }


}

export default Brick;