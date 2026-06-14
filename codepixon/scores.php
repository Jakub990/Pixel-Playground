<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highscores</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>
<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    
    <main>
        <h1>🏆 Highscores Top 5</h1>

        <h2>Tic Tac Toe</h2>
        <table class="score-tabel">
            <tr><th>Positie</th><th>Speler</th><th>Streak</th></tr>
            <tr><td>🥇 1</td><td>CodeNinja</td><td>14</td></tr>
            <tr><td>🥈 2</td><td>PixelMaster99</td><td>8</td></tr>
            <tr><td>🥉 3</td><td>ShadowPlayer</td><td>7</td></tr>
            <tr><td>4</td><td>RetroGamer</td><td>5</td></tr>
            <tr><td>5</td><td>Anoniem</td><td>4</td></tr>
        </table>

        <h2>Galgje</h2>
        <table class="score-tabel">
            <tr><th>Positie</th><th>Speler</th><th>Streak</th></tr>
            <tr><td>🥇 1</td><td>GamerX</td><td>15</td></tr>
            <tr><td>🥈 2</td><td>RetroGamer</td><td>9</td></tr>
            <tr><td>🥉 3</td><td>CodeNinja</td><td>6</td></tr>
            <tr><td>4</td><td>PixelMaster99</td><td>5</td></tr>
            <tr><td>5</td><td>Sander_SD</td><td>3</td></tr>
        </table>
    </main>

    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>
</html>