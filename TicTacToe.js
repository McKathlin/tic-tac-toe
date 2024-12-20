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
            clear,
            getAtCoords, getAtIndex,
            isClearAtCoords, isClearAtIndex,
            setAtCoords, setAtIndex,
            indexAtCoords,
            log
        };
    })();

    // Players

    const createPlayer = function(symbol) {
        let _name = symbol;
        const mark = symbol;

        const getName = function() {
            return _name;
        };

        const setName = function(newName) {
            if (newName && newName.length > 0) {
                _name = newName;
            } else {
                _name = mark;
            }
        };

        return { getName, setName, mark };
    };

    const playerX = createPlayer("X");
    const playerO = createPlayer("O");

    const _players = [playerX, playerO];

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

    const isWinningIndex = function(index) {
        return _winIndexes && _winIndexes.has(index);
    };

    const _checkWin = function(player) {
        _winIndexes = _getWinIndexes(player.mark);
        if (_winIndexes) {
            _winner = player;
            return true;
        } else {
            return false;
        }
    };

    const _getWinIndexes = function(mark) {
        let indexes = _getColumnWinIndexes(mark)
            || _getRowWinIndexes(mark)
            || _getDiagonalWinIndexes(mark);
        if (indexes) {
            return new Set(indexes);
        } else {
            return null;
        }
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

    // Game tie tracking

    let _isTie = false;

    const isTie = function() {
        return _isTie;
    };

    const _checkTie = function() {
        if (_isTie) {
            return true;
        } else {
            // It's only counted as a tie
            // if all dimensions are unwinnable for all players.
            _isTie = _checkColumnTie()
                && _checkRowTie()
                && _checkDiagonalTie();
            return _isTie;
        }
    };

    const _checkColumnTie = function() {
        for (let c = 0; c < board.WIDTH; c++) {
            let seenMark = null;
            let columnTie = false;
            for (let r = 0; r < board.HEIGHT && !columnTie; r++) {
                let mark = board.getAtCoords(c, r);
                if (!mark) {
                    // No mark to check.
                } else if (!seenMark) {
                    seenMark = mark;
                } else if (mark != seenMark) {
                    columnTie = true;
                }
            }

            if (!columnTie) {
                return false;
            }
        }
        // If we're here, all columns are tied.
        return true;
    };

    const _checkRowTie = function() {
        for (let r = 0; r < board.HEIGHT; r++) {
            let seenMark = null;
            let rowTie = false;
            for (let c = 0; c < board.WIDTH && !rowTie; c++) {
                let mark = board.getAtCoords(c, r);
                if (!mark) {
                    // No mark to check.
                } else if (!seenMark) {
                    seenMark = mark;
                } else if (mark != seenMark) {
                    rowTie = true;
                }
            }

            if (!rowTie) {
                return false;
            }
        }
        // If we're here, all rows are tied.
        return true;
    };

    const _checkDiagonalTie = function() {
        if (board.WIDTH != board.HEIGHT) {
            return true; // No diagonals to check.
        }

        // Top left to bottom right
        let tie = false;
        let seenMark = null;
        for (let i = 0; i < board.WIDTH && !tie; i++) {
            let mark = board.getAtCoords(i, i);
            if (!mark) {
                // No mark to check.
            } else if (!seenMark) {
                seenMark = mark;
            } else if (mark != seenMark) {
                tie = true;
            }
        }

        if (!tie) {
            return false;
        }

        // Top right to bottom left
        tie = false;
        seenMark = null;

        for (let r = 0; r < board.HEIGHT && !tie; r++) {
            let c = (board.WIDTH - 1) - r;
            let mark = board.getAtCoords(c, r);
            if (!mark) {
                // No mark to check.
            } else if (!seenMark) {
                seenMark = mark;
            } else if (mark != seenMark) {
                tie = true;
            }
        }
        return tie;
    };

    // Game actions

    const canMarkIndex = function(index) {
        return !_winner && board.isClearAtIndex(index);
    };

    const markIndex = function(index) {
        const mark = currentPlayer().mark;
        if (!canMarkIndex(index)) {
            return false;
        }
        board.setAtIndex(index, mark);
        if (!_checkWin(currentPlayer())) {
            _checkTie();
            _changeTurn();
        }
        return true;
    };

    const reset = function() {
        board.clear();
        _currentPlayerIndex = 0;
        _winner = null;
        _winIndexes = null;
        _isTie = false;
    };

    // Public returnables

    return {
        board,
        playerX,
        playerO,
        currentPlayer,
        isTie,
        markIndex,
        reset,
        isWinningIndex,
        winner,
    };
})();

//=============================================================================
// Node constants
//=============================================================================
const playerXNameNode = document.getElementById("player-x-name");
const playerONameNode = document.getElementById("player-o-name");
const statusMessageNode = document.getElementById("status-message");
const resetButtonNode = document.getElementById("reset-button");
const boardNode = document.getElementById("board");
const cellNodes = boardNode.querySelectorAll(".cell");

//=============================================================================
// Controller
//=============================================================================

const DisplayController = (function() {

    const markCell = function(cellNode) {
        const index = _getIndexForNodeId(cellNode.id);
        if (index == null) {
            return; // Can't mark; not a valid cell.
        }
        TicTacToe.markIndex(index);
        refresh();
    };

    const resetGame = function() {
        TicTacToe.reset();
        refresh();
    };

    const refresh = function() {
        _refreshStatusMessage();
        _refreshResetButton();
        _refreshBoard();
    };

    const setNameX = function(newName) {
        TicTacToe.playerX.setName(newName);
        _refreshStatusMessage();
    };

    const setNameO = function(newName) {
        TicTacToe.playerO.setName(newName);
        _refreshStatusMessage();
    };

    // Private helpers

    const _getIndexForNodeId = function(nodeId) {
        // Expected node ID form: "cell-N" where N is the integer index
        if (nodeId.startsWith("cell-")) {
            return Number.parseInt(nodeId.slice(5));
        } else {
            return null;
        }
    };

    const _refreshStatusMessage = function() {
        if (TicTacToe.winner()) {
            let winnerName = TicTacToe.winner().getName();
            statusMessageNode.textContent = `${winnerName} wins!`;
        } else if (TicTacToe.isTie()) {
            statusMessageNode.textContent = `It's a tie.`;
        } else {
            let playerName = TicTacToe.currentPlayer().getName();
            statusMessageNode.textContent = `It's ${playerName}'s turn.`;
        }
    };

    const _refreshResetButton = function() {
        if (TicTacToe.winner() || TicTacToe.isTie()) {
            resetButtonNode.classList.remove("hidden");
        } else {
            resetButtonNode.classList.add("hidden");
        }
    };

    const _refreshBoard = function() {
        boardNode.classList.remove("x-turn");
        boardNode.classList.remove("o-turn");
        if (TicTacToe.winner()) {
            boardNode.classList.add("win-state");
        } else {
            boardNode.classList.remove("win-state");
            let mark = TicTacToe.currentPlayer().mark;
            if (mark) {
                boardNode.classList.add(`${mark.toLowerCase()}-turn`);
            }
        }

        for (cellNode of cellNodes) {
            _refreshCell(cellNode);
        }
    }

    const _refreshCell = function(cellNode) {
        let index = _getIndexForNodeId(cellNode.id);
        let mark = TicTacToe.board.getAtIndex(index);
        if (mark) {
            cellNode.textContent = mark;
            cellNode.classList.remove("empty");
            cellNode.classList.add("marked");
        } else {
            cellNode.textContent = "";
            cellNode.classList.remove("marked");
            cellNode.classList.add("empty");
        }
        
        if (TicTacToe.isWinningIndex(index)) {
            cellNode.classList.add("winning");
        } else {
            cellNode.classList.remove("winning");
        }
    };

    // Public returnables
    return { markCell, resetGame, refresh, setNameX, setNameO };

})();

//=============================================================================
// Init
//=============================================================================

for (const cellNode of cellNodes) {
    cellNode.addEventListener("click", function(event) {
        DisplayController.markCell(event.target);
    });
}

resetButtonNode.addEventListener("click", function(event) {
    DisplayController.resetGame();
});

playerXNameNode.addEventListener("input", function(event) {
    DisplayController.setNameX(event.target.value);
});

playerONameNode.addEventListener("input", function(event) {
    DisplayController.setNameO(event.target.value);
});

DisplayController.refresh();