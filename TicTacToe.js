//=============================================================================
// Tic Tac Toe 
// by McKathlin
//-----------------------------------------------------------------------------
// Model
//=============================================================================

const TicTacToe = (function () {

    // Board
    const board = (function() {
        const WIDTH = 3;
        const HEIGHT = 3;
        const cells = new Array(WIDTH * HEIGHT);

        const clear = function() {
            for (let i = 0; i < cells.length; i++) {
                cells[i] = null;
            }
        };

        const getAtIndex = function(index) {
            return cells[index];
        };

        const getAtCoords = function(col, row) {
            return cells[indexAtCoords(col, row)];
        };

        const isClearAtIndex = function(index) {
            return !getAtIndex(index);
        };

        const isClearAtCoords = function(col, row) {
            return !getAtCoords(col, row);
        };

        const setAtIndex = function(index, mark) {
            cells[index] = mark;
        };

        const setAtCoords = function(col, row, mark) {
            cells[indexAtCoords(col, row)] = mark;
        };

        const log = function() {
            let idx = 0;
            for (let r = 0; r < HEIGHT; r++) {
                let currentRow = new Array(WIDTH);
                for (let c = 0; c < WIDTH; c++) {
                    currentRow[c] = getAtIndex(idx) ?? "_";
                    idx++;
                }
                console.log(currentRow.join(" "));
            }
            console.log("");
        };

        const indexAtCoords = function(col, row) {
            return (row * WIDTH) + col;
        };

        clear();
        return {
            WIDTH, HEIGHT,
            getAtCoords, getAtIndex,
            isClearAtCoords, isClearAtIndex,
            setAtCoords, setAtIndex,
            indexAtCoords,
            log
        };
    })();

    // Players

    const createPlayer = function(symbol) {
        const name = symbol;
        const mark = symbol;

        const markBoardIndex = function(board, index) {
            if (board.isClearAtIndex(index)) {
                board.setAtIndex(index, symbol);
            } else {
                throw new Error("Can't mark an occupied cell!");
            }
        };

        return { name, mark, markBoardIndex };
    };

    const _players = [
        createPlayer("X"),
        createPlayer("O")
    ];

    // Game turn tracking

    let _currentPlayerIndex = 0;
    
    const currentPlayer = function() {
        return _players[_currentPlayerIndex];
    };

    const _changeTurn = function() {
        _currentPlayerIndex = (_currentPlayerIndex + 1) % _players.length;
    };

    // Game win tracking

    let _winner = null;

    const winner = function() {
        return _winner;
    };

    const checkWin = function(player) {
        if (_getWinIndexes(player.mark)) {
            _winner = player;
            return true;
        } else {
            return false;
        }
    }

    const _getWinIndexes = function(mark) {
        return _getColumnWinIndexes(mark)
            || _getRowWinIndexes(mark)
            || _getDiagonalWinIndexes(mark);
    };

    const _getColumnWinIndexes = function(mark) {

    };

    const _getRowWinIndexes = function(mark) {

    };

    const _getDiagonalWinIndexes = function(mark) {
        if (board.WIDTH != board.HEIGHT) {
            return null;
        }
        const length = board.WIDTH;

        // Top left to bottom right
        let winIndexes = [];
        for (let i = 0; i < length && winIndexes !== null; i++) {
            if (board.getAtCoords(i, i) == mark) {
                winIndexes += board.indexAtCoords(i, i);
            } else {
                winIndexes = null;
            }
        }

        if (winIndexes) {
            return winIndexes;
        }

        // Top right to bottom left
        winIndexes = [];
        for (let r = 0; r < length && winIndexes !== null; r++) {
            let c = (length - 1) - r;
            if (board.getAtCoords(c, r) == mark) {
                winIndexes += board.indexAtCoords(c, r);
            } else {
                winIndexes = null;
            }
        }

        return winIndexes;
    };

    // Game actions



    // Public returnables

    return { board, currentPlayer, winner, checkWin };
})();

//=============================================================================
// Controller
//=============================================================================

// Mark cell

// Restart game

// Refresh cell

// Refresh board

//=============================================================================
// Init
//=============================================================================

TicTacToe.currentPlayer().markBoardIndex(TicTacToe.board, 0);
TicTacToe.currentPlayer().markBoardIndex(TicTacToe.board, 8);
TicTacToe.currentPlayer().markBoardIndex(TicTacToe.board, 4);
TicTacToe.board.log();
console.log(TicTacToe.checkWin(TicTacToe.currentPlayer()));