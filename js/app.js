// https://opentdb.com/api_config.php
const TRIVIA_URL = 'https://opentdb.com/api.php?amount=20&difficulty=easy&type=multiple';

// --- State ---
let triviaQuestions = [];
let currentIndex = 0;
let score = 0;
let shuffledAnswers = [];

// --- Elements ---
const startScreen    = document.getElementById('start-screen');
const gameScreen     = document.getElementById('game-screen');
const endScreen      = document.getElementById('end-screen');
const startButton    = document.getElementById('start-button');
const nextButton     = document.getElementById('next-button');
const restartButton  = document.getElementById('restart-button');
const questionText   = document.getElementById('question-text');
const questionCount  = document.getElementById('question-count');
const scoreDisplay   = document.getElementById('score-display');
const feedbackEl     = document.getElementById('feedback');
const finalScore     = document.getElementById('final-score');
const answerButtons  = document.querySelectorAll('.answer-btn');

// --- Helpers ---
function decodeHTML(html) {
  const el = document.createElement('textarea');
  el.innerHTML = html;
  return el.value;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// --- Game Logic ---
function showQuestion() {
  const q = triviaQuestions[currentIndex];

  questionCount.textContent = `Question ${currentIndex + 1} / ${triviaQuestions.length}`;
  questionText.textContent  = decodeHTML(q.question);
  feedbackEl.textContent    = '';
  feedbackEl.className      = '';
  nextButton.classList.add('hidden');

  shuffledAnswers = shuffle([...q.incorrect_answers, q.correct_answer]);

  answerButtons.forEach((btn, i) => {
    btn.textContent = decodeHTML(shuffledAnswers[i]);
    btn.className   = 'answer-btn';
    btn.disabled    = false;
  });
}

function handleAnswer(selectedText) {
  const correct = decodeHTML(triviaQuestions[currentIndex].correct_answer);

  answerButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add('correct');
    } else if (btn.textContent === selectedText) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedText === correct) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedbackEl.textContent   = '\u2713 Correct!';
    feedbackEl.className     = 'feedback-correct';
  } else {
    feedbackEl.textContent = `\u2717 Wrong! The answer was: ${correct}`;
    feedbackEl.className   = 'feedback-incorrect';
  }

  nextButton.classList.remove('hidden');
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= triviaQuestions.length) {
    showEndScreen();
  } else {
    showQuestion();
  }
}

function showEndScreen() {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  finalScore.textContent = `You scored ${score} out of ${triviaQuestions.length}!`;
}

async function startGame() {
  startButton.disabled    = true;
  startButton.textContent = 'Loading...';

  try {
    const res  = await fetch(TRIVIA_URL);
    const data = await res.json();
    triviaQuestions = data.results;
    currentIndex    = 0;
    score           = 0;
    scoreDisplay.textContent = 'Score: 0';

    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    showQuestion();
  } catch (err) {
    startButton.disabled    = false;
    startButton.textContent = 'Start Game';
    alert('Failed to load questions. Please try again.');
  }
}

// --- Event Listeners ---
startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', nextQuestion);

restartButton.addEventListener('click', () => {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  startButton.disabled    = false;
  startButton.textContent = 'Start Game';
  startGame();
});

answerButtons.forEach((btn) => {
  btn.addEventListener('click', () => handleAnswer(btn.textContent));
});

