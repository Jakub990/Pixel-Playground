<?php
require_once 'db-connect.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    if (!empty($username) && !empty($password) && !empty($confirmPassword)) {
        if ($password !== $confirmPassword) {
            $error = 'Wachtwoorden komen niet overeen.';
        } elseif (strlen($password) < 6) {
            $error = 'Wachtwoord moet minimaal 6 tekens lang zijn.';
        } else {
            try {
                // Check if username already exists
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
                $stmt->execute(['username' => $username]);
                if ($stmt->fetchColumn() > 0) {
                    $error = 'Gebruikersnaam is al in gebruik.';
                } else {
                    // Create new user
                    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                    $insertStmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
                    $insertStmt->execute([
                        'username' => $username,
                        'password' => $hashedPassword
                    ]);
                    $success = 'Registratie succesvol! Je kunt nu inloggen.';
                }
            } catch (PDOException $e) {
                $error = 'Er is een fout opgetreden: ' . $e->getMessage();
            }
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
    <title>Registreer</title>
    <link rel="stylesheet" href="CSS/style.css">
</head>

<body>
    <header>
        <?php include 'partials/header.php'; ?>
    </header>
    <main>
        <article class="form-container">
            <h1>Registreer</h1>
            <?php if (!empty($error)): ?>
                <div class="error-msg" style="color: #ff5e62; background: rgba(255, 94, 98, 0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px; border: 1px solid rgba(255, 94, 98, 0.3); text-align: center;">
                    <?php echo htmlspecialchars($error); ?>
                </div>
            <?php endif; ?>
            <?php if (!empty($success)): ?>
                <div class="success-msg" style="color: #48bb78; background: rgba(72, 187, 120, 0.1); padding: 10px; border-radius: 5px; margin-bottom: 15px; border: 1px solid rgba(72, 187, 120, 0.3); text-align: center;">
                    <?php echo htmlspecialchars($success); ?>
                </div>
            <?php endif; ?>
            <form action="registreer.php" method="POST" class="auth-form">
                <article class="form-group">
                    <label for="username">Gebruikersnaam</label>
                    <input type="text" id="username" name="username" placeholder="Kies een gebruikersnaam" required>
                </article>
                <article class="form-group">
                    <label for="password">Wachtwoord</label>
                    <input type="password" id="password" name="password" placeholder="Kies een wachtwoord" required>
                </article>
                <article class="form-group">
                    <label for="confirm-password">Wachtwoord Bevestigen</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Herhaal je wachtwoord" required>
                </article>
                <button type="submit" class="action-btn auth-btn">Registreren</button>
            </form>
            <p class="form-footer-link">
                <a href="login.php">Heb je al een account? Log hier in</a>
            </p>
        </article>
    </main>
    <footer>
        <?php include 'partials/footer.php'; ?>
    </footer>
</body>

</html>