const colors = [
    { fr: "ROUGE", color: "red" },
    { fr: "BLEU", color: "blue" },
    { fr: "JAUNE", color: "yellow" },
    { fr: "VERT", color: "green" },
    { fr: "VIOLET", color: "purple" },
    { fr: "NOIR", color: "black" },
    { fr: "BLANC", color: "white" },
    { fr: "ROSE", color: "pink" },
    { fr: "ORANGE", color: "orange" },
    { fr: "MARRON", color: "brown" },
    { fr: "GRIS", color: "gray" },
    { fr: "CYAN", color: "cyan" },
    { fr: "MAGENTA", color: "magenta" },
    { fr: "OR", color: "#FFD700" },
    { fr: "ARGENT", color: "#C0C0C0" },
    { fr: "MARINE", color: "navy" },
    { fr: "CORAIL", color: "coral" },
    { fr: "TURQUOISE", color: "turquoise" },
    { fr: "CITRON VERT", color: "lime" },
    { fr: "INDIGO", color: "indigo" },
    { fr: "BORDEAUX", color: "maroon" },
    { fr: "BEIGE", color: "beige" },
    { fr: "OLIVE", color: "olive" },
    { fr: "SARCELLE", color: "teal" },
    { fr: "CRAMOISI", color: "crimson" },
    { fr: "LAVANDE", color: "lavender" },
    { fr: "SAUMON", color: "salmon" },
    { fr: "MENTHE", color: "#98FF98" },
    { fr: "ABRICOT", color: "#FBCEB1" },
    { fr: "POURPRE", color: "#800080" },
    { fr: "FUCHSIA", color: "fuchsia" },
    { fr: "CHOCOLAT", color: "chocolate" },
    { fr: "CIEL", color: "skyblue" },
    { fr: "PÊCHE", color: "peachpuff" },
    { fr: "PRUNE", color: "plum" },
    { fr: "KAKI", color: "khaki" },
    { fr: "TOMATE", color: "tomato" },
    { fr: "ORCHIDÉE", color: "orchid" },
    { fr: "SIENNA", color: "sienna" },
    { fr: "ÉMERAUDE", color: "#50C878" },
    { fr: "RUBIS", color: "#E0115F" },
    { fr: "AMBRE", color: "#FFBF00" },
    { fr: "AUBERGINE", color: "#614051" },
    { fr: "CANARD", color: "#048B9A" },
    { fr: "FRAMBOISE", color: "#E30B5C" },
    { fr: "MOUTARDE", color: "#FFDB58" },
    { fr: "CHARBON", color: "#36454F" },
    { fr: "IVOIRE", color: "ivory" },
    { fr: "LILAS", color: "#C8A2C8" }
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

function renderColorPalette() {
    const palette = document.getElementById("colorPalette");
    if (!palette) return;

    palette.innerHTML = "";
    colors.forEach(({ fr, color }) => {
        const swatch = document.createElement("div");
        swatch.classList.add("palette-swatch");
        swatch.style.backgroundColor = color;
        swatch.title = fr;

        const label = document.createElement("span");
        label.classList.add("palette-label");
        label.innerText = fr;

        swatch.appendChild(label);
        palette.appendChild(swatch);
    });
}

renderColorPalette();
startGame();