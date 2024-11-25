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
        return { name, mark };
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
    let _winIndexes = null;

    const winner = function() {
        return _winner;
    };

    const winIndexes = function() {
        return _winIndexes;
    }

    const _checkWin = function(player) {
        _winIndexes = _getWinIndexes(player.mark);
        if (_winIndexes) {
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
        for (let c = 0; c < board.WIDTH; c++) {
            let winIndexes = [];
            for (let r = 0; r < board.HEIGHT && winIndexes !== null; r++) {
                if (board.getAtCoords(c, r) == mark) {
                    winIndexes.push(board.indexAtCoords(c, r));
                } else {
                    winIndexes = null;
                }
            } // end for each cell of the column

            if (winIndexes) {
                return winIndexes;
            }
        } // end for reach column in the board
        // If we're here, no win was found at any column.
        return null;
    };

    const _getRowWinIndexes = function(mark) {
        for (let r = 0; r < board.HEIGHT; r++) {
            let winIndexes = [];
            for (let c = 0; c < board.WIDTH && winIndexes !== null; c++) {
                if (board.getAtCoords(c, r) == mark) {
                    winIndexes.push(board.indexAtCoords(c, r));
                } else {
                    winIndexes = null;
                }
            } // end for each cell in the row

            if (winIndexes) {
                return winIndexes;
            }
        } // end for each row in the board
        // If we're here, no win was found at any row.
        return null;
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
                winIndexes.push(board.indexAtCoords(i, i));
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
                winIndexes.push(board.indexAtCoords(c, r));
            } else {
                winIndexes = null;
            }
        }

        return winIndexes;
    };

    // Game actions

    const canMarkIndex = function(index) {
        return !this._winner && board.isClearAtIndex(index);
    }

    const markIndex = function(index) {
        const mark = this.currentPlayer().mark;
        if (!canMarkIndex(index)) {
            return false;
        }
        board.setAtIndex(index, mark);
        _checkWin(this.currentPlayer());
        _changeTurn();
        return true;
    };

    const reset = function() {
        board.clear();
        _currentPlayerIndex = 0;
        _winner = null;
        _winIndexes = null;
    };

    // Public returnables

    return { board, currentPlayer, markIndex, winner, winIndexes };
})();

//=============================================================================
// Node constants
//=============================================================================
const statusMessage = document.getElementById("status-message");
const boardNode = document.getElementById("board");

//=============================================================================
// Controller
//=============================================================================

const DisplayController = (function() {
    // Mark cell

    markCell = function(cellNode) {
        const index = _getIndexForNodeId(cellNode.id);
        if (index == null) {
            return; // Can't mark; not a valid cell.
        }

        const mark = TicTacToe.currentPlayer().mark;

        cellNode.textContent = mark;
        TicTacToe.markIndex(index);
    }

    // Restart game

    // Refresh cell

    // Refresh message

    

    // Private helpers

    _getIndexForNodeId = function(nodeId) {
        // Expected node ID form: "cell-N" where N is the integer index
        if (nodeId.startsWith("cell-")) {
            return Number.parseInt(nodeId.slice(5));
        } else {
            return null;
        }
        
    };

    _getNodeIdForIndex = function(index) {
        return `cell-${index}`;
    }
    // Public returnables
    return { markCell };

})();

//=============================================================================
// Init
//=============================================================================

for (cellNode of boardNode.querySelectorAll(".cell")) {
    cellNode.addEventListener("click", function(event) {
        DisplayController.markCell(event.target);
    });
}