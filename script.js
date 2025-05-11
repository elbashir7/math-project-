
const questions = [
    {
        station: "المحطة الأولى: معادلات القوى",
        type: "input",
        data: [
            { q: "ما قيمة x في المعادلة: x³ = 27", a: "3" },
            { q: "ما قيمة x في المعادلة: (x + 1)² = 16", a: "3" },
            { q: "ما قيمة x في المعادلة: (2x − 1)^5 = 125", a: "2" }
        ]
    },
    {
        station: "المحطة الثانية: معادلات كسرية متعددة الحدود",
        type: "input",
        data: [
            { q: "ما قيمة x في المعادلة: (x − 1) / (x + 2) = 3", a: "2.5" },
            { q: "ما قيمة x في المعادلة: x/(x+1) + 2/(x+1) = 1", a: "0" }
        ]
    },
    {
        station: "المحطة الثالثة: معادلات جذرية",
        type: "choice",
        data: [
            { q: "ما قيمة x في المعادلة: √(x + 4) = 6", choices: ["32", "20", "25"], correct: "32" },
            { q: "ما قيمة x في المعادلة: √(2x − 1) + 7 = 3", choices: ["8.5", "21.4", "6"], correct: "8.5" }
        ]
    }
];

let currentStation = 0, currentQuestion = 0, score = 0;

const title = document.getElementById("station-title");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const choicesContainer = document.getElementById("choices");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const yaySound = document.getElementById("yay-sound");
const einstein = document.getElementById("einstein");

function showQuestion() {
    const station = questions[currentStation];
    title.textContent = station.station;
    const qData = station.data[currentQuestion];

    feedback.textContent = "";
    if (station.type === "input") {
        questionText.textContent = qData.q;
        answerInput.style.display = "inline-block";
        choicesContainer.style.display = "none";
        answerInput.value = "";
    } else if (station.type === "choice") {
        questionText.textContent = qData.q;
        answerInput.style.display = "none";
        choicesContainer.style.display = "block";
        choicesContainer.innerHTML = "";
        qData.choices.forEach(choice => {
            const btn = document.createElement("button");
            btn.textContent = choice;
            btn.onclick = () => checkAnswer(choice);
            choicesContainer.appendChild(btn);
        });
    }
    submitBtn.textContent = "إرسال";
}

function checkAnswer(userAnswer = null) {
    const station = questions[currentStation];
    const qData = station.data[currentQuestion];
    const correctAnswer = station.type === "input" ? qData.a : qData.correct;
    const answer = station.type === "input" ? answerInput.value.trim() : userAnswer;

    if (answer === correctAnswer) {
        score++;
        scoreDisplay.textContent = `النقاط: ${score}`;
        yaySound.play();
        einstein.style.display = "block";
        einstein.classList.add("jump");
        setTimeout(() => {
            einstein.classList.remove("jump");
            einstein.style.display = "none";
        }, 800);

        currentQuestion++;
        if (currentQuestion >= station.data.length) {
            currentStation++;
            currentQuestion = 0;
            if (currentStation >= questions.length) {
                title.textContent = "أحسنت! أنهيت جميع المحطات!";
                questionText.textContent = "";
                answerInput.style.display = "none";
                choicesContainer.style.display = "none";
                submitBtn.style.display = "none";
                return;
            }
        }
        setTimeout(showQuestion, 1000);
    } else {
        feedback.textContent = station.type === "choice" ? "Wrong" : "حاول مرة أخرى";
    }
}

submitBtn.onclick = () => {
    if (submitBtn.textContent === "ابدأ") {
        submitBtn.textContent = "إرسال";
        showQuestion();
    } else {
        checkAnswer();
    }
};
