import { Component, OnInit } from '@angular/core';

import { AlertService } from '../alert/alert.service';

const playerSymbol = 'P';
const cpuSymbol = 'C';

@Component({
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

    board: string[][];
    gameOver: boolean;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.board = [[null, null, null], [null, null, null], [null, null, null]];
    }

    /**
     * play user move
     */
    playUserMove(rowIndex: number, colIndex: number): void {
        this.playMove(rowIndex, colIndex, playerSymbol);

        if (!this.gameOver) {
            this.playCPUMove();
        }
    }

    /**
     * play cpu move
     */
    playCPUMove(): void {
        const bestMove = this.findBestMove();
        this.playMove(bestMove.row, bestMove.col, cpuSymbol);
    }

    /**
     * find best move for CPU
     */
    findBestMove(): any {
        const bestMove = { row: -1, col: -1 };
        const board = this.board;
        let bestScore = Number.NEGATIVE_INFINITY;

        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            for (let colIndex = 0; colIndex < board.length; colIndex++) {

                if (this.isValidMove(board, rowIndex, colIndex)) {
                    // Make the move
                    board[rowIndex][colIndex] = cpuSymbol;

                    // simulate for this move.
                    const moveScore = this.simulateGame(board, 0, false);

                    // Undo the move
                    board[rowIndex][colIndex] = null;

                    // If the value of the current move is more than the best value, then update best score
                    if (moveScore > bestScore) {
                        bestMove.row = rowIndex;
                        bestMove.col = colIndex;
                        bestScore = moveScore;
                    }
                }
            }
        }
        return bestMove;
    }

    /**
     * simulate game
     */
    simulateGame(board: any, depth: number, isCpu: boolean): number {
        const score = this.isGameWon(board, cpuSymbol) ? 1 : this.isGameWon(board, playerSymbol) ? -1 : 0;

        // If game is over, return score
        if (score !== 0) {
            return score;
        }

        // if game is drawn, return 0
        if (!this.isMovesLeft(board)) {
            return 0;
        }

        // If this is CPU's move
        if (isCpu) {
            let bestScore = Number.NEGATIVE_INFINITY;

            for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
                for (let colIndex = 0; colIndex < board.length; colIndex++) {
                    // Check if cell is empty
                    if (this.isValidMove(board, rowIndex, colIndex)) {
                        // Make the move
                        board[rowIndex][colIndex] = cpuSymbol;

                        // simulate recursively and choose the maximum value
                        bestScore = this.max(bestScore, this.simulateGame(board, depth + 1, !isCpu));

                        // Undo the move
                        board[rowIndex][colIndex] = null;
                    }
                }
            }
            return bestScore;

        // If this is Player's move
        } else {
            let bestScore = Number.POSITIVE_INFINITY;

            for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
                for (let colIndex = 0; colIndex < board.length; colIndex++) {
                    // Check if cell is empty
                    if (this.isValidMove(board, rowIndex, colIndex)) {
                        // Make the move
                        board[rowIndex][colIndex] = playerSymbol;

                        // simulate recursively and choose the minimum value
                        bestScore = this.min(bestScore, this.simulateGame(board, depth + 1, !isCpu));

                        // Undo the move
                        board[rowIndex][colIndex] = null;
                    }
                }
            }
            return bestScore;
        }
    }

    /**
     * play move
     */
    playMove(rowIndex: number, colIndex: number, syb: string): void {
        if (this.isValidMove(this.board, rowIndex, colIndex)) {
            // play
            this.board[rowIndex][colIndex] = syb;

            this.checkGameSituation(this.board, syb);
        } else {
            this.alertService.addAlert('Invalid Move..!!', 'error');
        }
    }

    /**
     * check if the current move is valid
     */
    isValidMove(board: any, rowIndex: number, colIndex: number): boolean {
        return this.isMovesLeft(board) && board[rowIndex][colIndex] == null;
    }

    /**
     * check if any moves is left for play
     */
    isMovesLeft(board: any): boolean {
        let moveLeft = false;
        for (const row of board) {
            if (row.length < board.length && !moveLeft) {
                moveLeft = true;
            } else if (!moveLeft) {
                for (const cell of row) {
                    if (!moveLeft) {
                        moveLeft = (cell == null);
                    }
                }
            }
        }
        return moveLeft;
    }

    /**
     * check if game won by symbol
     */
    isGameWon(board: any, syb: string): boolean {
        return this.hasRowMatched(board, syb) || this.hasColumnMatched(board, syb) || this.hasDiagonalMatched(board, syb);
    }

    /**
     * check if either of the row matches
     */
    hasRowMatched(board: any, syb: string, rowIndex: number = 0): boolean {
        return (board[rowIndex][0] === syb && board[rowIndex][0] === board[rowIndex][1] && board[rowIndex][1] === board[rowIndex][2]) ||
            (rowIndex < board.length - 1 && this.hasRowMatched(board, syb, ++rowIndex));
    }

    /**
     * check if either of the columns matches
     */
    hasColumnMatched(board: any, syb: string, colIndex: number = 0): boolean {
        return (board[0][colIndex] === syb && board[0][colIndex] === board[1][colIndex] && board[1][colIndex] === board[2][colIndex]) ||
            (colIndex < board.length - 1 && this.hasColumnMatched(board, syb, ++colIndex));
    }

    /**
     * check if either of the diagonal matches
     */
    hasDiagonalMatched(board: any, syb: string): boolean {
        return (board[0][0] === syb && board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
            board[0][2] === syb && board[0][2] === board[1][1] && board[1][1] === board[2][0];
    }

    /**
     * check game situation and show message if game over
     */
    checkGameSituation(board: any, syb: string) {
        // check if game has been won by player
        if (this.isGameWon(board, syb)) {
            this.gameOver = true;
            if (syb === playerSymbol) {
                this.alertService.addAlert('You Win..!!', 'success');
            } else {
                this.alertService.addAlert('You Lose..!!', 'error');
            }


        // check if game has been drawn
        } else if (!this.isMovesLeft(board)) {
            this.gameOver = true;
            this.alertService.addAlert('Game is Drawn..!!', 'info');
        }
    }

    /**
     * get maximum of two scores
     */
    max(score1: number, score2: number): number {
        return score1 > score2 ? score1 : score2;
    }

    /**
     * getminimum of two scores
     */
    min(score1: number, score2: number): number {
        return score1 < score2 ? score1 : score2;
    }

    /**
     * reset game board
     */
    resetBoard(): void {
        this.board = [[null, null, null], [null, null, null], [null, null, null]];
        this.gameOver = false;
    }

}
