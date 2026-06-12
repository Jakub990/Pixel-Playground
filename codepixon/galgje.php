<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galgje</title>
    <link rel="stylesheet" href="CSS/style.css">
    <script src="lib/hangman.js"></script>


</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <section id="hangman-game" aria-labelledby="game-title">
            <h1 id="game-title">Galgje</h1>
            <p>Streak: <strong id="streak-count">0</strong></p>
            
            <section id="game-status" aria-live="polite" style="font-weight: bold; margin-bottom: 10px;"></section>
            
            <section id="word-display" style="font-size: 2em; letter-spacing: 0.2em; margin: 20px 0;"></section>
            
            <p>incorrect guesses: <span id="wrong-guesses">0</span> / <span id="max-guesses">6</span></p>
            
            <article id="hint-container" style="display: none; background: #fff3cd; padding: 10px; border: 1px solid #ffeeba; margin-bottom: 20px; border-radius: 4px;">
                <strong>Hint:</strong> <span id="hint-text"></span>
            </article>

            <section id="keyboard" style="display: flex; flex-wrap: wrap; gap: 5px; max-width: 400px; margin-bottom: 20px;">
                <!-- Knoppen worden door JS gegenereerd -->
            </section>
            
            <button id="restart-btn" style="display: none; padding: 10px 20px; font-size: 16px; cursor: pointer;">Probeer Opnieuw</button>
        </section>
    </main>
    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
    
</body>

</html>
