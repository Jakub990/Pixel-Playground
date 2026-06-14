<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mijn Profiel</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>
<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    
    <main>
        <h1>Mijn Profiel</h1>
        
        <section class="profiel-blok">
            <h3>Gebruiker: PixelMaster99 (LVL 12)</h3>
            <p><em>"Altijd in voor een potje Tic Tac Toe!"</em></p>
            <p>Status: 🟢 Online</p>
        </section>

        <section class="profiel-blok">
            <h3>Statistieken</h3>
            <p>Games gespeeld: 142</p>
            <p>Beste Tic Tac Toe Streak: 8</p>
            <p>Beste Galgje Streak: 5</p>
        </section>

        <section class="profiel-blok">
            <h3>Mijn Vrienden</h3>
            <ul>
                <li>🦊 RetroGamer (In Game)</li>
                <li>🐱 CodeNinja (Online)</li>
                <li>🐻 ShadowPlayer (Offline)</li>
            </ul>
        </section>
    </main>

    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>
</html>