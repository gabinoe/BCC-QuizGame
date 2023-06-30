document.addEventListener('DOMContentLoaded', function () {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answers');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const initialsInput = document.getElementById('initials');
    const saveButton = document.getElementById('save-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer = 30;
    let timerInterval;

    startButton.addEventListener('click', startQuiz);
    saveButton.addEventListener('click', saveScore);

    function startQuiz() {
        startButton.style.display = 'none';
        scoreContainer.style.display = 'none';
        loadQuestion();
        startTimer();
    }

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.innerText = question.question;

        answerElement.innerHTML = '';
        for (let i = 0; i < question.answers.length; i++) {
            const answer = document.createElement('li');
            answer.innerText = question.answers[i];
            answer.addEventListener('click', checkAnswer);
            answerElement.appendChild(answer);
        }
    }

    function checkAnswer() {
        const selectedAnswer = this.innerText;
        const question = questions[currentQuestionIndex];

        if (selectedAnswer === question.correctAnswer) {
            score++;
        } else {
            timer -= 5;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex
