document.addEventListener("DOMContentLoaded", () => {
    // Game state
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; // Player is always X, Bot/Opponent is O
    let gameMode = "bot"; // 'bot' or 'pvp'
    let isGameOver = false;

    // Load streaks from localStorage
    let streak = parseInt(localStorage.getItem("tictactoe_streak")) || 0;
    let bestStreak = parseInt(localStorage.getItem("tictactoe_best_streak")) || 0;

    // Winning lines
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // DOM Elements
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("game-status");
    const resetBtn = document.getElementById("reset-btn");
    const modeBotBtn = document.getElementById("mode-bot");
    const modePvPBtn = document.getElementById("mode-pvp");
    const streakCount = document.getElementById("streak-count");
    const bestStreakCount = document.getElementById("best-streak");
    const difficultyBadge = document.getElementById("difficulty-badge");
    const difficultyBox = document.getElementById("difficulty-box");

    // Initialize stats display
    updateStatsDisplay();

    // Mode Selection Handlers
    modeBotBtn.addEventListener("click", () => {
        if (gameMode === "bot") return;
        gameMode = "bot";
        modeBotBtn.classList.add("active");
        modePvPBtn.classList.remove("active");
        difficultyBox.style.display = "block";
        resetGame();
    });

    modePvPBtn.addEventListener("click", () => {
        if (gameMode === "pvp") return;
        gameMode = "pvp";
        modePvPBtn.classList.add("active");
        modeBotBtn.classList.remove("active");
        difficultyBox.style.display = "none";
        resetGame();
    });

    // Reset button handler
    resetBtn.addEventListener("click", resetGame);

    // Cell click handler
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            const index = parseInt(e.target.getAttribute("data-index"));
            if (board[index] !== "" || isGameOver) return;
            
            // If bot turn is in progress, ignore clicks
            if (gameMode === "bot" && currentPlayer === "O") return;

            makeMove(index, currentPlayer);
        });
    });

    // Process a move
    function makeMove(index, player) {
        board[index] = player;
        const cell = cells[index];
        cell.textContent = player;
        cell.classList.add(player === "X" ? "x-mark" : "o-mark");
        cell.disabled = true;

        if (checkWin(player)) {
            endGame(player);
        } else if (board.every(cell => cell !== "")) {
            endGame("draw");
        } else {
            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatusText();

            // Trigger bot if it's the bot's turn
            if (gameMode === "bot" && currentPlayer === "O" && !isGameOver) {
                // Short delay to simulate thinking and feel natural
                setTimeout(makeBotMove, 500);
            }
        }
    }

    // Update the visual turns and game message
    function updateStatusText() {
        if (isGameOver) return;

        if (gameMode === "pvp") {
            gameStatus.textContent = `Beurt: Speler ${currentPlayer}`;
        } else {
            gameStatus.textContent = currentPlayer === "X" ? "Jouw beurt (X)" : "Computer nadenken (O)...";
        }
    }

    // End of game handler
    function endGame(winner) {
        isGameOver = true;
        
        if (winner === "draw") {
            gameStatus.textContent = "Gelijkspel!";
            gameStatus.style.color = "#4a5568";
        } else {
            gameStatus.style.color = winner === "X" ? "#4facfe" : "#f56565";
            if (gameMode === "pvp") {
                gameStatus.textContent = `Speler ${winner} heeft gewonnen!`;
            } else {
                if (winner === "X") {
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

        // Disable all empty cells
        cells.forEach(cell => {
            if (cell.textContent === "") {
                cell.disabled = true;
            }
        });
    }

    // Check if the current player has won
    function checkWin(player) {
        return winConditions.some(condition => {
            return condition.every(index => board[index] === player);
        });
    }

    // Save streaks to localStorage
    function saveStats() {
        localStorage.setItem("tictactoe_streak", streak);
        localStorage.setItem("tictactoe_best_streak", bestStreak);
    }

    // Update the displays of Win Streak and Bot Difficulty
    function updateStatsDisplay() {
        streakCount.textContent = streak;
        bestStreakCount.textContent = bestStreak;

        // Determine difficulty badge text and class
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

    // Reset board and game state
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        isGameOver = false;
        
        gameStatus.textContent = gameMode === "pvp" ? "Beurt: Speler X" : "Jouw beurt (X)";
        gameStatus.style.color = "#2d3748";

        cells.forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
            cell.disabled = false;
        });
    }

    // --- BOT AI LOGIC ---

    function makeBotMove() {
        if (isGameOver) return;

        let selectedMove;

        // Select move strategy based on difficulty (determined by current win streak)
        if (streak === 0) {
            // Easy: 100% random moves
            selectedMove = getRandomMove();
        } else if (streak === 1) {
            // Medium: 50% random / 50% smart moves
            if (Math.random() < 0.5) {
                selectedMove = getRandomMove();
            } else {
                selectedMove = getSmartMove();
            }
        } else if (streak === 2) {
            // Hard: 20% random / 80% smart moves
            if (Math.random() < 0.2) {
                selectedMove = getRandomMove();
            } else {
                selectedMove = getSmartMove();
            }
        } else {
            // Unbeatable (Streak >= 3): 100% minimax perfect play
            selectedMove = getBestMinimaxMove();
        }

        if (selectedMove !== undefined && selectedMove !== null) {
            makeMove(selectedMove, "O");
        }
    }

    // Get an array of all currently empty indices
    function getEmptyIndices(currentBoard = board) {
        let indices = [];
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === "") {
                indices.push(i);
            }
        }
        return indices;
    }

    // EASY strategy: random moves
    function getRandomMove() {
        const emptyIndices = getEmptyIndices();
        if (emptyIndices.length === 0) return null;
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // MEDIUM/HARD strategy: heuristic rules (win, block, center, corners)
    function getSmartMove() {
        const emptyIndices = getEmptyIndices();
        if (emptyIndices.length === 0) return null;

        // 1. Can bot win in 1 move?
        for (let idx of emptyIndices) {
            board[idx] = "O";
            const won = checkWin("O");
            board[idx] = ""; // Revert
            if (won) return idx;
        }

        // 2. Can player win in 1 move? Block it.
        for (let idx of emptyIndices) {
            board[idx] = "X";
            const lost = checkWin("X");
            board[idx] = ""; // Revert
            if (lost) return idx;
        }

        // 3. Take center if available
        if (board[4] === "") return 4;

        // 4. Take corners if available
        const corners = [0, 2, 6, 8].filter(idx => board[idx] === "");
        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)];
        }

        // 5. Take whatever is left
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    // UNBEATABLE strategy: Minimax
    function getBestMinimaxMove() {
        let bestScore = -Infinity;
        let move;

        const emptyIndices = getEmptyIndices();
        for (let idx of emptyIndices) {
            board[idx] = "O";
            let score = minimax(board, 0, false);
            board[idx] = ""; // Revert

            if (score > bestScore) {
                bestScore = score;
                move = idx;
            }
        }
        return move;
    }

    // Minimax recursive evaluation
    function minimax(tempBoard, depth, isMaximizing) {
        // Base evaluations
        if (checkWin("O")) return 10 - depth;
        if (checkWin("X")) return depth - 10;
        if (tempBoard.every(cell => cell !== "")) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < tempBoard.length; i++) {
                if (tempBoard[i] === "") {
                    tempBoard[i] = "O";
                    let score = minimax(tempBoard, depth + 1, false);
                    tempBoard[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < tempBoard.length; i++) {
                if (tempBoard[i] === "") {
                    tempBoard[i] = "X";
                    let score = minimax(tempBoard, depth + 1, true);
                    tempBoard[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
});
