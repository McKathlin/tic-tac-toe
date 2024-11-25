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
            return cells[_indexAtCoords(col, row)];
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
            cells[_indexAtCoords(col, row)] = mark;
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

        const _indexAtCoords = function(col, row) {
            return (row * WIDTH) + col;
        };

        clear();
        return {
            getAtCoords, getAtIndex,
            isClearAtCoords, isClearAtIndex,
            setAtCoords, setAtIndex,
            log
        };
    })();

    // Players

    const createPlayer = function(symbol) {
        const name = symbol;

        const markBoardIndex = function(board, index) {
            if (board.isClearAtIndex(index)) {
                board.setAtIndex(index, symbol);
            } else {
                throw new Error("Can't mark an occupied cell!");
            }
        };

        return { name, markBoardIndex };
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



    // Game actions



    // Public returnables

    return { board, currentPlayer };
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

TicTacToe.currentPlayer().markBoardIndex(TicTacToe.board, 3);
TicTacToe.board.log();