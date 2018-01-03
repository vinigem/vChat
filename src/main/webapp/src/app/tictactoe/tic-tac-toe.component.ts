import { Component, OnInit } from '@angular/core';

import { AlertService } from '../alert/alert.service';

@Component({
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

    board: string[][];
    moveCount: number;
    gameOver: boolean;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.board = [[], [], []];
        this.moveCount = 0;
    }

    playMove(rowIndex: number, colIndex:  number): void {
        const playerSymbol = 'P';

        if(this.isValidMove(rowIndex, colIndex)) {
            // play
            this.board[rowIndex][colIndex] = playerSymbol;

            // increment move count
            this.moveCount++;

            // check if game has been won
            if(this.isGameWon(playerSymbol)) {
                this.gameOver = true;
                this.alertService.addAlert('You Win..!!', 'success');

            // check if game has been drawn
            }else if(this.isGameDraw()) {
                this.gameOver = true;
                this.alertService.addAlert('Game is Drawn..!!', 'info');
            }

            this.playCPUMove(rowIndex, colIndex);

        }else {
            this.alertService.addAlert('Invalid Move..!!', 'error');
        }
    }

    isValidMove(rowIndex: number, colIndex:  number): boolean {
        return !this.gameOver && this.board[rowIndex][colIndex] == null;
    }

    playCPUMove(userRowIndex: number, userColIndex:  number): void {
        const cpuSymbol = 'C';
    }

    isGameDraw(): boolean {
        return this.moveCount === 9;
    }

    isGameWon(syb: string): boolean {
        return this.hasRowMatched(syb) || this.hasColumnMatched(syb) || this.hasDiagonalMatched(syb);
    }

    hasRowMatched(syb: string, rowIndex: number = 0): boolean {
        if (this.board[rowIndex][0] === syb) {
            return this.board[rowIndex][0] === this.board[rowIndex][1] && this.board[rowIndex][1] === this.board[rowIndex][2];
        } else if (rowIndex < 3) {
            return this.hasRowMatched(syb, ++rowIndex);
        } else {
            return false;
        }
    }

    hasColumnMatched(syb: string, colIndex: number = 0): boolean {
        if (this.board[0][colIndex] === syb) {
            return this.board[0][colIndex] === this.board[1][colIndex] && this.board[1][colIndex] === this.board[2][colIndex];
        } else if (colIndex < 3) {
            return this.hasRowMatched(syb, ++colIndex);
        } else {
            return false;
        }
    }

    hasDiagonalMatched(syb: string): boolean {
        if (this.board[0][0] === syb) {
            return this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2];
        } else if (this.board[0][2] === syb) {
            return this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0];
        } else {
            return false;
        }
    }

    resetBoard(): void {
        this.board = [[], [], []];
        this.moveCount = 0;
        this.gameOver = false;
    }

}
