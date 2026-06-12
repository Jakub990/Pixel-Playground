<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="CSS/style.css">
    <script src="lib/Tictactoe.js" defer></script>
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <section id="tictactoe-game" aria-labelledby="game-title">
            <h1 id="game-title">Tic Tac Toe</h1>
            
            <!-- Game Mode Selectors -->
            <article class="mode-container">
                <button id="mode-bot" class="mode-btn active">Tegen de Computer</button>
                <button id="mode-pvp" class="mode-btn">Tegen een Vriend</button>
            </article>

            <!-- Stats/Info displays -->
            <article class="stats-panel">
                <article class="stat-box" id="difficulty-box">
                    <span>Moeilijkheid:</span>
                    <strong id="difficulty-badge" class="badge-easy">Makkelijk</strong>
                </article>
                <article class="stat-box">
                    <span>Streak:</span>
                    <strong id="streak-count">0</strong>
                </article>
                <article class="stat-box">
                    <span>Beste Streak:</span>
                    <strong id="best-streak">0</strong>
                </article>
            </article>

            <!-- Game Status Messages -->
            <article id="game-status" aria-live="polite">Beurt: Speler X</article>

            <!-- 3x3 Grid Board -->
            <article id="board" class="board-grid">
                <button class="cell" data-index="0" aria-label="Rij 1, Kolom 1"></button>
                <button class="cell" data-index="1" aria-label="Rij 1, Kolom 2"></button>
                <button class="cell" data-index="2" aria-label="Rij 1, Kolom 3"></button>
                
                <button class="cell" data-index="3" aria-label="Rij 2, Kolom 1"></button>
                <button class="cell" data-index="4" aria-label="Rij 2, Kolom 2"></button>
                <button class="cell" data-index="5" aria-label="Rij 2, Kolom 3"></button>
                
                <button class="cell" data-index="6" aria-label="Rij 3, Kolom 1"></button>
                <button class="cell" data-index="7" aria-label="Rij 3, Kolom 2"></button>
                <button class="cell" data-index="8" aria-label="Rij 3, Kolom 3"></button>
            </article>

            <!-- Restart Button -->
            <button id="reset-btn" class="action-btn">Opnieuw Spelen</button>
        </section>
    </main>
    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>

</html>
