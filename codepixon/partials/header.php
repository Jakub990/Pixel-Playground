<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<img class="logo" src="images/Logo-bg.png">

<nav>
    <a href="index.php">Home</a>
    <a href="spellen.php">Spellen</a>
    <?php if (isset($_SESSION['username'])): ?>
        <a href="profiel.php">Profiel</a>
        <a href="logout.php">Uitloggen</a>
        <span style="margin-left: 15px; color: #4facfe; font-weight: bold;">Hallo, <?php echo htmlspecialchars($_SESSION['username']); ?>!</span>
    <?php else: ?>
        <a href="login.php">Login</a>
        <a href="registreer.php">Registreer</a>
    <?php endif; ?>
    <a href="scores.php">Scores</a>
</nav>



