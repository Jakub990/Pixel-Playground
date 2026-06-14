<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>

    <main>
        <section class="welkom">
            <h1>Welkom bij PIXON! 🎮</h1>
            <p>Speel leuke games tegen vrienden of de computer en probeer de highscore te behalen!</p>
            <p>
                <a href="spellen.php" class="knop">Bekijk Games</a>
                <a href="scores.php" class="knop">Bekijk Highscores</a>
            </p>
        </section>

        <section class="info-sectie">
            <h2>Wat kun je hier doen?</h2>
            <ul>
                <li><strong>Games:</strong> Speel Tic Tac Toe, 4 op een Rij en Galgje.</li>
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