//=============================================================================
// Tic Tac Toe 
// by McKathlin
//-----------------------------------------------------------------------------
// Model
//=============================================================================

const TicTacToe = (function () {
    const board = (function() {
        const WIDTH = 3;
        const HEIGHT = 3;
        const cells = new Array(WIDTH * HEIGHT);

        const getAtIndex = function(index) {
            return cells[index];
        };

        const getAtCoords = function(col, row) {
            return cells[_indexAtCoords(col, row)];
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

        return {
            getAtIndex,
            getAtCoords,
            setAtIndex,
            setAtCoords,
            log
        };
    })();

    // Players

    // Game state tracking

    // Public returnables

    return { board };
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

TicTacToe.board.log();

TicTacToe.board.setAtCoords(1, 0, "X");
TicTacToe.board.setAtCoords(2, 2, "O");

TicTacToe.board.log();