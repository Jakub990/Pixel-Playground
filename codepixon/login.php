<?php
require_once 'db-connect.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (!empty($username) && !empty($password)) {
        try {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
            $stmt->execute(['username' => $username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                if (session_status() === PHP_SESSION_NONE) {
                    session_start();
                }
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                header("Location: index.php");
                exit();
            } else {
                $error = 'Onjuiste gebruikersnaam of wachtwoord.';
            }
        } catch (PDOException $e) {
            $error = 'Er is een fout opgetreden: ' . $e->getMessage();
        }
    } else {
        $error = 'Vul alle velden in.';
    }
}
?>
<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <article class="form-container">
            <h1>Login</h1>
            <?php if (!empty($error)): ?>
                <div class="error-msg" style="color: #ff5e62; background: rgba(255, 94, 98, 0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px; border: 1px solid rgba(255, 94, 98, 0.3); text-align: center;">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>
            <form action="login.php" method="POST" class="auth-form">
                <article class="form-group">
                    <label for="username">Gebruikersnaam</label>
                    <input type="text" id="username" name="username" placeholder="Voer je gebruikersnaam in" required>
                </article>
                <article class="form-group">
                    <label for="password">Wachtwoord</label>
                    <input type="password" id="password" name="password" placeholder="Voer je wachtwoord in" required>
                </article>
                <button type="submit" class="action-btn auth-btn">Inloggen</button>
            </form>
            <p class="form-footer-link">
                <a href="registreer.php">Nog geen account? registreer hier</a>
            </p>
        </article>
    </main>
    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>

</html>