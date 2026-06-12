document.addEventListener("DOMContentLoaded", () => {
    // Game constants
    const ROWS = 6;
    const COLS = 7;

    // Game state
    let board = [];
    let currentPlayer = "R"; // 'R' = Red (Player 1), 'Y' = Yellow (Player 2 / Bot)
    let gameMode = "bot"; // 'bot' or 'pvp'
    let isGameOver = false;
    let isBotThinking = false;

    // Load streaks from localStorage
    let streak = parseInt(localStorage.getItem("connect4_streak")) || 0;
    let bestStreak = parseInt(localStorage.getItem("connect4_best_streak")) || 0;

    // DOM Elements
    const boardEl = document.getElementById("connect4-board");
    const gameStatus = document.getElementById("game-status");
    const resetBtn = document.getElementById("reset-btn");
    const modeBotBtn = document.getElementById("mode-bot");
    const modePvPBtn = document.getElementById("mode-pvp");
    const streakCount = document.getElementById("streak-count");
    const bestStreakCount = document.getElementById("best-streak");
    const difficultyBadge = document.getElementById("difficulty-badge");
    const difficultyBox = document.getElementById("difficulty-box");
    const indicatorBtns = document.querySelectorAll(".indicator-btn");

    // Initialize board
    initBoard();
    updateStatsDisplay();

    // Mode Selection Handlers
    modeBotBtn.addEventListener("click", () => {
        if (gameMode === "bot" || isBotThinking) return;
        gameMode = "bot";
        modeBotBtn.classList.add("active");
        modePvPBtn.classList.remove("active");
        difficultyBox.style.display = "block";
        resetGame();
    });

    modePvPBtn.addEventListener("click", () => {
        if (gameMode === "pvp" || isBotThinking) return;
        gameMode = "pvp";
        modePvPBtn.classList.add("active");
        modeBotBtn.classList.remove("active");
        difficultyBox.style.display = "none";
        resetGame();
    });

    // Reset button handler
    resetBtn.addEventListener("click", () => {
        if (isBotThinking) return;
        resetGame();
    });

    // Setup indicator buttons
    indicatorBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const col = parseInt(e.target.getAttribute("data-col"));
            handleColumnSelection(col);
        });
    });

    // Initialize board DOM and data array
    function initBoard() {
        boardEl.innerHTML = "";
        board = [];

        for (let r = 0; r < ROWS; r++) {
            board.push(Array(COLS).fill(""));
            for (let c = 0; c < COLS; c++) {
                const slot = document.createElement("article");
                slot.classList.add("slot");
                slot.setAttribute("data-row", r);
                slot.setAttribute("data-col", c);
                
                // Clicking on a cell triggers dropping in its column
                slot.addEventListener("click", () => {
                    handleColumnSelection(c);
                });

                boardEl.appendChild(slot);
            }
        }
    }

    // Handles the selection of a column (either by clicking slot or indicator button)
    function handleColumnSelection(col) {
        if (isGameOver || isBotThinking) return;
        if (gameMode === "bot" && currentPlayer === "Y") return;

        // Try to place token
        const row = getLowestAvailableRow(board, col);
        if (row === -1) return; // Column full

        makeMove(row, col, currentPlayer);
    }

    // Finds the lowest available row in a column
    function getLowestAvailableRow(tempBoard, col) {
        for (let r = ROWS - 1; r >= 0; r--) {
            if (tempBoard[r][col] === "") {
                return r;
            }
        }
        return -1;
    }

    // Executes a move
    function makeMove(row, col, player) {
        board[row][col] = player;

        // Update UI cell
        const cell = boardEl.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(player === "R" ? "red-token" : "yellow-token");

        // Check win or draw
        if (checkWin(board, player)) {
            endGame(player);
        } else if (isBoardFull(board)) {
            endGame("draw");
        } else {
            // Switch player
            currentPlayer = currentPlayer === "R" ? "Y" : "R";
            updateStatusText();

            // Trigger bot turn if appropriate
            if (gameMode === "bot" && currentPlayer === "Y" && !isGameOver) {
                isBotThinking = true;
                disableControls(true);
                // Artificial delay for realism
                setTimeout(() => {
                    makeBotMove();
                    isBotThinking = false;
                    disableControls(false);
                }, 600);
            }
        }
    }

    // Enable/disable board interactions
    function disableControls(disable) {
        indicatorBtns.forEach(btn => {
            btn.disabled = disable || isColumnFull(parseInt(btn.getAttribute("data-col")));
        });
    }

    function isColumnFull(col) {
        return board[0][col] !== "";
    }

    function isBoardFull(tempBoard) {
        return tempBoard[0].every(cell => cell !== "");
    }

    // Update the visual status label
    function updateStatusText() {
        if (isGameOver) return;

        if (gameMode === "pvp") {
            const colorName = currentPlayer === "R" ? "Rood" : "Geel";
            gameStatus.textContent = `Beurt: Speler ${colorName}`;
            gameStatus.style.color = currentPlayer === "R" ? "#ff2a2e" : "#ffa751";
        } else {
            if (currentPlayer === "R") {
                gameStatus.textContent = "Jouw beurt (Rood)";
                gameStatus.style.color = "#ff2a2e";
            } else {
                gameStatus.textContent = "Computer denkt na...";
                gameStatus.style.color = "#ffa751";
            }
        }
    }

    // End game handler
    function endGame(winner) {
        isGameOver = true;

        if (winner === "draw") {
            gameStatus.textContent = "Gelijkspel!";
            gameStatus.style.color = "#4a5568";
        } else {
            const winnerName = winner === "R" ? "Rood" : "Geel";
            gameStatus.style.color = winner === "R" ? "#ff2a2e" : "#ffa751";

            if (gameMode === "pvp") {
                gameStatus.textContent = `Speler ${winnerName} heeft gewonnen!`;
            } else {
                if (winner === "R") {
                    gameStatus.textContent = "Je hebt gewonnen!";
                    streak++;
                    if (streak > bestStreak) {
                        bestStreak = streak;
                    }
                    saveStats();
                } else {
                    gameStatus.textContent = "Computer heeft gewonnen!";
                    streak = 0;
                    saveStats();
                }
                updateStatsDisplay();
            }
        }

        disableControls(true);
    }

    // Check if player has 4 connected tokens
    function checkWin(tempBoard, player) {
        // Horizontal check
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (tempBoard[r][c] === player &&
                    tempBoard[r][c + 1] === player &&
                    tempBoard[r][c + 2] === player &&
                    tempBoard[r][c + 3] === player) {
                    return true;
                }
            }
        }

        // Vertical check
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c < COLS; c++) {
                if (tempBoard[r][c] === player &&
                    tempBoard[r + 1][c] === player &&
                    tempBoard[r + 2][c] === player &&
                    tempBoard[r + 3][c] === player) {
                    return true;
                }
            }
        }

        // Diagonal down-right check
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (tempBoard[r][c] === player &&
                    tempBoard[r + 1][c + 1] === player &&
                    tempBoard[r + 2][c + 2] === player &&
                    tempBoard[r + 3][c + 3] === player) {
                    return true;
                }
            }
        }

        // Diagonal up-right check
        for (let r = 3; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                if (tempBoard[r][c] === player &&
                    tempBoard[r - 1][c + 1] === player &&
                    tempBoard[r - 2][c + 2] === player &&
                    tempBoard[r - 3][c + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    }

    // Save statistics to localStorage
    function saveStats() {
        localStorage.setItem("connect4_streak", streak);
        localStorage.setItem("connect4_best_streak", bestStreak);
    }

    // Updates displays of Win Streak and Bot Difficulty
    function updateStatsDisplay() {
        streakCount.textContent = streak;
        bestStreakCount.textContent = bestStreak;

        difficultyBadge.className = ""; // Reset class
        if (streak === 0) {
            difficultyBadge.textContent = "Makkelijk";
            difficultyBadge.classList.add("badge-easy");
        } else if (streak === 1) {
            difficultyBadge.textContent = "Gemiddeld";
            difficultyBadge.classList.add("badge-medium");
        } else if (streak === 2) {
            difficultyBadge.textContent = "Moeilijk";
            difficultyBadge.classList.add("badge-hard");
        } else {
            difficultyBadge.textContent = "Onverslaanbaar";
            difficultyBadge.classList.add("badge-unbeatable");
        }
    }

    // Reset game board
    function resetGame() {
        currentPlayer = "R";
        isGameOver = false;
        initBoard();
        updateStatusText();
        disableControls(false);
    }

    // --- BOT AI LOGIC ---

    function makeBotMove() {
        let col;

        if (streak === 0) {
            // Easy bot: random moves
            col = getRandomMove();
        } else if (streak === 1) {
            // Medium bot: 50% random / 50% smart
            col = Math.random() < 0.5 ? getRandomMove() : getSmartMove();
        } else if (streak === 2) {
            // Hard bot: 20% random / 80% smart
            col = Math.random() < 0.2 ? getRandomMove() : getSmartMove();
        } else {
            // Unbeatable bot: Minimax evaluation
            col = getMinimaxMove();
        }

        // Drop in selected column
        if (col !== null && col !== undefined) {
            const row = getLowestAvailableRow(board, col);
            if (row !== -1) {
                makeMove(row, col, "Y");
            }
        }
    }

    // Get list of non-full column indices
    function getValidMoves() {
        let cols = [];
        for (let c = 0; c < COLS; c++) {
            if (board[0][c] === "") {
                cols.push(c);
            }
        }
        return cols;
    }

    // 1. Easy: random moves
    function getRandomMove() {
        const validMoves = getValidMoves();
        if (validMoves.length === 0) return null;
        return validMoves[Math.floor(Math.random() * validMoves.length)];
    }

    // 2. Medium/Hard: smart moves (Checks next move win or block, then center bias)
    function getSmartMove() {
        const validMoves = getValidMoves();
        if (validMoves.length === 0) return null;

        // Check if bot can win on next turn
        for (let col of validMoves) {
            const row = getLowestAvailableRow(board, col);
            board[row][col] = "Y";
            const won = checkWin(board, "Y");
            board[row][col] = ""; // Revert
            if (won) return col;
        }

        // Check if player can win on next turn; block it
        for (let col of validMoves) {
            const row = getLowestAvailableRow(board, col);
            board[row][col] = "R";
            const blocked = checkWin(board, "R");
            board[row][col] = ""; // Revert
            if (blocked) return col;
        }

        // Preference to center columns: [3, 2, 4, 1, 5, 0, 6]
        const order = [3, 2, 4, 1, 5, 0, 6];
        for (let col of order) {
            if (validMoves.includes(col)) return col;
        }

        return getRandomMove();
    }

    // 3. Unbeatable: Minimax with alpha-beta pruning (depth 4)
    function getMinimaxMove() {
        const validMoves = getValidMoves();
        if (validMoves.length === 0) return null;

        let bestScore = -Infinity;
        let bestCol = validMoves[0];

        // Search depth of 4 is fast enough for quick execution
        const depth = 4;

        for (let col of validMoves) {
            const row = getLowestAvailableRow(board, col);
            board[row][col] = "Y";
            let score = minimax(board, depth, -Infinity, Infinity, false);
            board[row][col] = "";

            if (score > bestScore) {
                bestScore = score;
                bestCol = col;
            }
        }

        return bestCol;
    }

    // Heuristic board evaluation function
    function evaluateBoard(tempBoard) {
        let score = 0;

        // Score Center Column
        const centerCol = 3;
        let centerCount = 0;
        for (let r = 0; r < ROWS; r++) {
            if (tempBoard[r][centerCol] === "Y") centerCount++;
            else if (tempBoard[r][centerCol] === "R") centerCount--;
        }
        score += centerCount * 3;

        // Helper to score a window of 4 cells
        function evaluateWindow(window) {
            let botCount = window.filter(cell => cell === "Y").length;
            let playerCount = window.filter(cell => cell === "R").length;
            let emptyCount = window.filter(cell => cell === "").length;

            if (botCount === 4) return 100;
            if (botCount === 3 && emptyCount === 1) return 5;
            if (botCount === 2 && emptyCount === 2) return 2;

            if (playerCount === 3 && emptyCount === 1) return -40; // High blocking penalty
            if (playerCount === 2 && emptyCount === 2) return -2;

            return 0;
        }

        // Horizontal Evaluation
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                const window = [tempBoard[r][c], tempBoard[r][c+1], tempBoard[r][c+2], tempBoard[r][c+3]];
                score += evaluateWindow(window);
            }
        }

        // Vertical Evaluation
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c < COLS; c++) {
                const window = [tempBoard[r][c], tempBoard[r+1][c], tempBoard[r+2][c], tempBoard[r+3][c]];
                score += evaluateWindow(window);
            }
        }

        // Positive Diagonal Evaluation
        for (let r = 0; r <= ROWS - 4; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                const window = [tempBoard[r][c], tempBoard[r+1][c+1], tempBoard[r+2][c+2], tempBoard[r+3][c+3]];
                score += evaluateWindow(window);
            }
        }

        // Negative Diagonal Evaluation
        for (let r = 3; r < ROWS; r++) {
            for (let c = 0; c <= COLS - 4; c++) {
                const window = [tempBoard[r][c], tempBoard[r-1][c+1], tempBoard[r-2][c+2], tempBoard[r-3][c+3]];
                score += evaluateWindow(window);
            }
        }

        return score;
    }

    // Minimax recursive search function
    function minimax(tempBoard, depth, alpha, beta, isMaximizing) {
        const isBotWon = checkWin(tempBoard, "Y");
        const isPlayerWon = checkWin(tempBoard, "R");
        const full = isBoardFull(tempBoard);

        if (isBotWon) return 1000 + depth;
        if (isPlayerWon) return -1000 - depth;
        if (full) return 0;
        if (depth === 0) return evaluateBoard(tempBoard);

        const validMoves = [];
        for (let c = 0; c < COLS; c++) {
            if (tempBoard[0][c] === "") {
                validMoves.push(c);
            }
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let col of validMoves) {
                const row = getLowestAvailableRow(tempBoard, col);
                tempBoard[row][col] = "Y";
                let evaluation = minimax(tempBoard, depth - 1, alpha, beta, false);
                tempBoard[row][col] = "";
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) break; // Pruning
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let col of validMoves) {
                const row = getLowestAvailableRow(tempBoard, col);
                tempBoard[row][col] = "R";
                let evaluation = minimax(tempBoard, depth - 1, alpha, beta, true);
                tempBoard[row][col] = "";
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) break; // Pruning
            }
            return minEval;
        }
    }
});
