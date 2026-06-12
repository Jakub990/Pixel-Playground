<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spellen</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <h1>Spellen</h1>
        <p> </p>

        <article class="game-card">
            <h2>Galgje</h2>
            <p>Test je woordkennis door de juiste letters te raden voordat je beurten op zijn!</p>
            <a href="galgje.php" class="play-btn">Speel Galgje</a>
        </article>

        <article class="game-card">
            <h2>Tic Tac Toe</h2>
            <p>Speel boter-kaas-en-eieren tegen een vriend op hetzelfde apparaat of daag de computer uit met toenemende moeilijkheidsgraad!</p>
            <a href="Tictactoe.php" class="play-btn">Speel Tic Tac Toe</a>
        </article>
    </main>
    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>

</html>