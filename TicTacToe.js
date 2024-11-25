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

        const setAtIndex = function(index, mark) {
            cells[index] = mark;
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

        return { getAtIndex, setAtIndex, log };
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

TicTacToe.board.setAtIndex(0, "X");
TicTacToe.board.setAtIndex(7, "O");

TicTacToe.board.log();