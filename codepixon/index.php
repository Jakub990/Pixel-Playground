<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Playground - Home</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>
<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    
    <main>
        <section class="welkom">
            <h1>Welkom bij Pixel Playground! 🎮</h1>
            <p>Ontdek leuke retro-games rechtstreeks in je browser. Speel tegen de computer of bekijk je scores.</p>
            <p>
                <a href="spellen.php" class="knop">Bekijk Games</a>
                <a href="scores.php" class="knop">Bekijk Highscores</a>
            </p>
        </section>

        <section class="info-sectie">
            <h2>Wat kun je hier doen?</h2>
            <ul>
                <li><strong>Klassieke Games:</strong> Speel Tic Tac Toe en Galgje.</li>
                <li><strong>Highscores:</strong> Probeer de top 5 te bereiken.</li>
                <li><strong>Vrienden:</strong> Zie wie er online zijn.</li>
            </ul>
        </section>
    </main>

    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>
</html>