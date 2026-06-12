<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vier op een rij</title>
    <link rel="stylesheet" href="CSS/style.css">
    <script src="lib/connect4.js" defer></script>
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <section id="connect4-game" aria-labelledby="game-title">
            <h1 id="game-title">Vier op een rij</h1>
            
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
            <article id="game-status" aria-live="polite">Beurt: Rood (Jij)</article>

            <!-- Connect 4 Board -->
            <article class="connect4-container">
                <!-- Column drop indicators / hover helpers -->
                <article class="column-indicators">
                    <button class="indicator-btn" data-col="0" aria-label="Drop in kolom 1">↓</button>
                    <button class="indicator-btn" data-col="1" aria-label="Drop in kolom 2">↓</button>
                    <button class="indicator-btn" data-col="2" aria-label="Drop in kolom 3">↓</button>
                    <button class="indicator-btn" data-col="3" aria-label="Drop in kolom 4">↓</button>
                    <button class="indicator-btn" data-col="4" aria-label="Drop in kolom 5">↓</button>
                    <button class="indicator-btn" data-col="5" aria-label="Drop in kolom 6">↓</button>
                    <button class="indicator-btn" data-col="6" aria-label="Drop in kolom 7">↓</button>
                </article>
                <article id="connect4-board" class="connect4-board">
                    <!-- 6 rows x 7 columns = 42 slots -->
                    <!-- We'll populate this dynamically in JavaScript for cleaner DOM management -->
                </article>
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
