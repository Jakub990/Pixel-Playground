document.addEventListener("DOMContentLoaded", () => {
    const words = [
        { word: "JAVASCRIPT", hint: "Een populaire programmeertaal voor het web." },
        { word: "INFORMATICA", hint: "De studie van de theoretische fundamenten van informatie en berekening." },
        { word: "PROGRAMMEREN", hint: "Het schrijven van instructies voor een computer." },
        { word: "BROWSER", hint: "Een programma om webpagina's mee te bekijken." },
        { word: "NETWERK", hint: "Een verzameling met elkaar verbonden computers." },
        { word: "DATABASE", hint: "Een gestructureerde verzameling van gegevens." },
        { word: "ALGORITME", hint: "Een reeks instructies om een probleem op te lossen." },
        { word: "FRAMEWORK", hint: "Een basisstructuur voor het bouwen van applicaties." },
        { word: "CONTROLLER", hint: "Een invoerapparaat om videogames mee te besturen." },
        { word: "MULTIPLAYER", hint: "Een spelmodus waarin meerdere spelers tegelijk spelen." },
        { word: "CHECKPOINT", hint: "Een opslagpunt in een game waar je opnieuw kunt beginnen als je af bent." },
        { word: "BOSS", hint: "Een sterke vijand aan het einde van een level." },
        { word: "CONSOLE", hint: "Een apparaat speciaal gemaakt voor het spelen van games, zoals een PlayStation of Xbox." },
        { word: "AVATAR", hint: "Een virtueel personage dat de speler vertegenwoordigt." },
        { word: "ESPORTS", hint: "Competitief gamen op professioneel niveau." },
        { word: "EASTEREGG", hint: "Een verborgen grap of geheim in een videogame." },
        { word: "LEVEL", hint: "Een specifieke fase of wereld binnen een game." },
        { word: "QUEST", hint: "Een missie of taak die een speler moet volbrengen." },
        { word: "LOOT", hint: "Voorwerpen of beloningen die je vindt of wint in een game." },
        { word: "INVENTORY", hint: "De plek waar alle spullen van je personage worden bewaard." },
        { word: "ACHIEVEMENT", hint: "Een digitale beloning voor het voltooien van een bepaalde uitdaging." },
        { word: "ARCADE", hint: "Een klassieke amusementskast of type snelle, actiegerichte game." },
        { word: "SANDBOX", hint: "Een type game waarin spelers veel vrijheid hebben, zoals Minecraft." },
        { word: "PIXEL", hint: "Het kleinste onderdeel van een beeldscherm, vaak geassocieerd met retro games." },
        { word: "GLITCH", hint: "Een kleine fout in de code van een game." },
        { word: "SPAWN", hint: "De locatie waar je personage begint of terugkomt in de game." },
        { word: "CAMPER", hint: "Iemand die op één plek blijft zitten om vijanden te verrassen (vaak in shooters)." },
        { word: "NOOB", hint: "Een beginner of onervaren speler." },
        { word: "SPEEDRUN", hint: "Het zo snel mogelijk uitspelen van een game." },
        { word: "FRAMERATES", hint: "Het aantal beelden per seconde (FPS) in een game." },
        { word: "JOYSTICK", hint: "Een pookje op een controller om mee te sturen." },
        { word: "PLATFORMER", hint: "Een gamegenre waarin je moet springen tussen platforms, zoals Mario." },
        { word: "RPG", hint: "Role-playing game: een genre waarin je de rol van een personage aanneemt." },
        { word: "SHOOTER", hint: "Een gamegenre waarin schieten met wapens centraal staat." },
        { word: "STEALTH", hint: "Een genre waarbij ongezien blijven belangrijk is." },
        { word: "HEADSHOT", hint: "Een voltreffer op het hoofd in een schietspel." },
        { word: "PATCH", hint: "Een update die fouten in een game herstelt of nieuwe dingen toevoegt." },
        { word: "BETA", hint: "Een testversie van een game die nog niet af is." },
        { word: "TUTORIAL", hint: "De uitleg aan het begin van een game om je de besturing te leren." },
        { word: "CUTSCENE", hint: "Een filmpje in de game waarin het verhaal wordt verteld." },
        { word: "NPC", hint: "Non-Player Character: een personage dat door de computer wordt bestuurd." },
        { word: "MMORPG", hint: "Een online rollenspel met heel veel spelers tegelijk, zoals World of Warcraft." },
        { word: "PVP", hint: "Player versus Player: spelers vechten tegen andere spelers." },
        { word: "PVE", hint: "Player versus Environment: spelers vechten tegen de computer." },
        { word: "HEALTHBAR", hint: "De balk die aangeeft hoeveel levenspunten je nog hebt." },
        { word: "MANA", hint: "Magische energie die je vaak nodig hebt voor spreuken in RPG's." },
        { word: "COMBO", hint: "Een reeks van aanvallen achter elkaar in een vechtspel." },
        { word: "MINIMAP", hint: "Een klein kaartje in de hoek van je scherm om te zien waar je bent." },
        { word: "REBOOT", hint: "Een nieuwe start van een bestaande gamereeks." },
        { word: "REMAKE", hint: "Een oude game die helemaal opnieuw is gemaakt met moderne graphics." },
        { word: "REMASTER", hint: "Een oude game die iets is opgepoetst voor nieuwere consoles." },
        { word: "DLC", hint: "Downloadable Content: extra content die je voor een game kunt downloaden." },
        { word: "SKIN", hint: "Een ander uiterlijk voor je personage of wapen." },
        { word: "GHOSTING", hint: "Een visueel probleem waarbij beelden een spoor achterlaten op je scherm." },
        { word: "HITBOX", hint: "Het onzichtbare vlak dat bepaalt of je personage geraakt is." },
        { word: "MINECRAFT", hint: "Een extreem populaire sandbox-game waarin je alles kunt bouwen met blokken." },
        { word: "RUST", hint: "Een multiplayer survivalgame waarin je moet overleven tegen andere spelers en de natuur." },
        { word: "FORTNITE", hint: "Een populaire battle royale-game met bouwelementen." },
        { word: "ROBLOX", hint: "Een platform waarop spelers hun eigen games kunnen maken en spelen." },
        { word: "VALORANT", hint: "Een tactische 5v5 hero-shooter." },
        { word: "OVERWATCH", hint: "Een hero-shooter van Blizzard met personages zoals Tracer en Winston." },
        { word: "SKYRIM", hint: "Een epische open-wereld RPG waarin je tegen draken vecht." },
        { word: "TERRARIA", hint: "Een 2D sandbox-game die vaak wordt vergeleken met Minecraft." },
        { word: "PORTAL", hint: "Een puzzelgame waarin je teleportatiegeweren gebruikt." },
        { word: "ZELDA", hint: "Een beroemde reeks avonturengames met de held Link." },
        { word: "MARIO", hint: "De bekendste loodgieter uit de gamewereld." },
        { word: "TETRIS", hint: "Een klassieke puzzelgame met vallende blokken." },
        { word: "POKEMON", hint: "Een game waarin je wezens moet vangen en trainen." },
        { word: "AMONGUS", hint: "Een multiplayergame waarin je de bedrieger (imposter) moet vinden." },
        { word: "ROCKETLEAGUE", hint: "Voetbal spelen met raket-aangedreven auto's." },
        { word: "CYBERPUNK", hint: "Een futuristische RPG-game met Keanu Reeves als Johnny Silverhand." },
        { word: "WITCHER", hint: "Een RPG-reeks over monsterjager Geralt van Rivia." },
        { word: "DOOM", hint: "Een snelle shooter waarin je tegen demonen vecht." },
        { word: "HALO", hint: "Een beroemde shooterreeks met de Master Chief in de hoofdrol." },
        { word: "FALLOUT", hint: "Een post-apocalyptische RPG in een wereld na een nucleaire oorlog." },
        { word: "DESTINY", hint: "Een sci-fi shooter met MMORPG-elementen van Bungie." }

    ];

    let currentWordObj = null;
    let guessedLetters = new Set();
    let wrongGuesses = 0;
    const maxGuesses = 6;
    let streak = 0;
    let isGameOver = false;

    const wordDisplay = document.getElementById("word-display");
    const wrongGuessesDisplay = document.getElementById("wrong-guesses");
    const maxGuessesDisplay = document.getElementById("max-guesses");
    const streakDisplay = document.getElementById("streak-count");
    const keyboard = document.getElementById("keyboard");
    const gameStatus = document.getElementById("game-status");
    const restartBtn = document.getElementById("restart-btn");
    const hintContainer = document.getElementById("hint-container");
    const hintText = document.getElementById("hint-text");

    maxGuessesDisplay.textContent = maxGuesses;
    document.body.style.transition = "background-color 0.3s ease";

    function initGame() {
        // Kies een willekeurig woord
        currentWordObj = words[Math.floor(Math.random() * words.length)];
        guessedLetters.clear();
        wrongGuesses = 0;
        isGameOver = false;
        
        updateDisplay();
        generateKeyboard();
        
        gameStatus.textContent = "";
        restartBtn.style.display = "none";
        hintContainer.style.display = "none";
    }

    function updateDisplay() {
        // Update de woord weergave
        const displayWord = currentWordObj.word
            .split("")
            .map(letter => guessedLetters.has(letter) ? letter : "_")
            .join("");
        wordDisplay.textContent = displayWord;

        // Update statistieken
        wrongGuessesDisplay.textContent = wrongGuesses;
        streakDisplay.textContent = streak;

        // Maak de achtergrondkleur roder per foute gok
        const intensity = wrongGuesses / maxGuesses;
        const r = Math.round(179 + (255 - 179) * intensity);
        const g = Math.round(179 + (70 - 179) * intensity);
        const b = Math.round(179 + (70 - 179) * intensity);
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        // Hint logica
        if (wrongGuesses >= 2) {
            hintContainer.style.display = "block";
            hintText.textContent = currentWordObj.hint;
        }

        checkWinOrLose(displayWord);
    }

    function generateKeyboard() {
        keyboard.innerHTML = "";
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement("button");
            button.textContent = letter;
            button.classList.add("key-btn");
            button.setAttribute("aria-label", `Gok letter ${letter}`);
            
            if (guessedLetters.has(letter)) {
                button.disabled = true;
            }

            button.addEventListener("click", () => handleGuess(letter));
            keyboard.appendChild(button);
        }
    }

    function handleGuess(letter) {
        if (isGameOver || guessedLetters.has(letter) || wrongGuesses >= maxGuesses) return;

        guessedLetters.add(letter);

        if (!currentWordObj.word.includes(letter)) {
            wrongGuesses++;
        }

        updateDisplay();
        generateKeyboard(); // Opnieuw renderen om knoppen uit te schakelen
    }

    function checkWinOrLose(displayWord) {
        if (!displayWord.includes("_")) {
            // Gewonnen
            isGameOver = true;
            streak++;
            gameStatus.textContent = "Gefeliciteerd! Je hebt het woord geraden!";
            gameStatus.style.color = "green";
            endGame(true);
        } else if (wrongGuesses >= maxGuesses) {
            // Verloren
            isGameOver = true;
            streak = 0;
            gameStatus.textContent = `Helaas, verloren! Het woord was: ${currentWordObj.word}`;
            gameStatus.style.color = "red";
            endGame(false);
        }
    }

    function endGame(won) {
        // Schakel alle knoppen uit
        const buttons = keyboard.querySelectorAll("button");
        buttons.forEach(btn => btn.disabled = true);
        
        if (won) {
            // Automatisch naar het volgende woord na een korte pauze om de streak soepel door te laten gaan
            setTimeout(initGame, 2000);
        } else {
            restartBtn.style.display = "block";
        }
    }

    restartBtn.addEventListener("click", initGame);

    // Luister naar fysiek toetsenbord
    document.addEventListener("keydown", (e) => {
        if (isGameOver) return;
        const key = e.key.toUpperCase();
        // Controleer of de toets een letter is van A tot Z
        if (/^[A-Z]$/.test(key)) {
            handleGuess(key);
        }
    });

    // Start het eerste spel
    initGame();
});
