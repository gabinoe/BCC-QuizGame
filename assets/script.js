const quizContainer = document.getElementById("quiz-container");
const startBtn = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const initialsForm = document.getElementById("initials-form");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Rome", "Berlin"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Mars", "Venus", "Mercury", "Jupiter"],
    answer: 0
  },
  // Add more questions...
];

// Initialize the quiz
function startQuiz() {
  startBtn.classList.add("hide");
  quizContainer.classList.remove("hide");
  startTimer();
  showQuestion();
}

// Start the timer
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Display a question and its choices
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;
  choicesElement.innerHTML = "";

  question.choices.forEach(function(choice, index) {
    const choiceBtn = document.createElement("button");
    choiceBtn.classList.add("choice");
    choiceBtn.textContent = choice;
    choiceBtn.addEventListener("click", checkAnswer);
    choicesElement.appendChild(choiceBtn);
  });
}

// Check if the selected answer is correct
function checkAnswer(event) {
  const selectedChoice = event.target;
  const question = questions[currentQuestionIndex];

  if (question.answer === Array.from(choicesElement.children).indexOf(selectedChoice)) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Incorrect!";
    timeLeft -= 10;
  }

  resultContainer.classList.remove("hide");
  setTimeout(function() {
    resultContainer.classList.add("hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// End the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.classList.add("hide");
  resultContainer.classList.add("hide");

  resultElement.textContent = `Your score is ${timeLeft}`;
  initialsInput.value = "";
  initialsInput.focus();
  resultContainer.classList.remove("hide");
}

// Save the initials and score
function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();

  // Save the initials and score using an API or local storage
  console.log(`Initials: ${initials}, Score: ${timeLeft}`);

  // Clear the form
  initialsInput.value = "";
}

// Event listeners
startBtn.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveScore);
