const colors = [
    { fr: "ROUGE", color: "red" },
    { fr: "BLEU", color: "blue" },
    { fr: "JAUNE", color: "yellow" },
    { fr: "VERT", color: "green" },
    { fr: "VIOLET", color: "purple" },
    { fr: "NOIR", color: "black" },
    { fr: "BLANC", color: "white" },
    { fr: "ROSE", color: "pink" }
];

let score = 0;
let current;
let correctVisible = true;
let level = "Facile";

function startGame() {
    score = 0;
    updateLevel();
    updateUI();
    nextQuestion();
}

function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
}

function updateLevel() {
    if (score >= 20) level = "Difficile";
    else if (score >= 10) level = "Moyen";
    else level = "Facile";
}

function nextQuestion() {
    document.getElementById("message").innerText = "";

    updateLevel();
    updateUI();

    current = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById("question").innerText = "Trouve : " + current.fr;

    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "";

    let options = generateOptions();

    options.forEach(opt => {
        const div = document.createElement("div");

        if (opt.type === "none") {
            div.classList.add("text-option");
            div.innerText = "N'existe pas";
        } else {
            div.classList.add("option");
            div.style.backgroundColor = opt.color;
            div.innerText = "";
        }

        div.onclick = () => checkAnswer(opt);

        gameArea.appendChild(div);
    });
}

/* 🎯 Smart logic: sometimes correct color is missing */
function generateOptions() {
    let base = [...colors];

    let difficultySize = 4;
    if (level === "Moyen") difficultySize = 5;
    if (level === "Difficile") difficultySize = 6;

    correctVisible = Math.random() > 0.3; // 70% visible

    let selected = [];

    if (correctVisible) {
        selected.push(current);
    }

    while (selected.length < difficultySize) {
        let rand = base[Math.floor(Math.random() * base.length)];
        if (!selected.includes(rand)) {
            selected.push(rand);
        }
    }

    let options = selected.map(c => ({
        type: "color",
        fr: c.fr,
        color: c.color
    }));

    // Always add "N'existe pas"
    options.push({ type: "none" });

    return shuffle(options);
}

function checkAnswer(opt) {
    let correct = false;

    if (opt.type === "none") {
        correct = !correctVisible;
    } else {
        correct = (opt.fr === current.fr);
    }

    if (correct) {
        score += 1;
        document.getElementById("message").innerText = "✅ Correct !";
    } else {
        score -= 1;
        document.getElementById("message").innerText = "❌ Faux !";
    }

    updateLevel();
    updateUI();

    setTimeout(nextQuestion, 800);
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

startGame();