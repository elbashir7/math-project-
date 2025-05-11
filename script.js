const questions = [
  { question: "حل المعادلة: 2س² - 8 = 0", answer: "2" },
  { question: "حل المعادلة: س² = 9", answer: "3" },
  { question: "حل المعادلة: س² - 16 = 0", answer: "4" },
];

let current = 0;
let score = 0;

const qText = document.getElementById("question-text");
const input = document.getElementById("answer-input");
const scoreDisplay = document.getElementById("score");
const congrats = document.getElementById("congrats");
const professor = document.getElementById("professor");
const sound = document.getElementById("yay-sound");

function showQuestion() {
  if (current < questions.length) {
    qText.textContent = questions[current].question;
    input.value = "";
  } else {
    qText.style.display = "none";
    input.style.display = "none";
    document.querySelector("button").style.display = "none";
    congrats.style.display = "block";
  }
}

function submitAnswer() {
  const userAns = input.value.trim();
  if (userAns === questions[current].answer) {
    score++;
    scoreDisplay.textContent = `النقاط: ${score}`;
    professor.classList.add("jump");
    sound.play();
    setTimeout(() => professor.classList.remove("jump"), 300);
  }
  current++;
  showQuestion();
}

showQuestion();