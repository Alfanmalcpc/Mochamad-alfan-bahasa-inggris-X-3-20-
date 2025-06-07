const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const resultText = document.getElementById("result-text");
const livesContainer = document.getElementById("lives-container");

// Efek suara
const correctSound = new Audio("audio/benar.mp3");
const wrongSound = new Audio("audio/salah.mp3");
const backgroundMusic = new Audio("audio/backsound.mp3");
backgroundMusic.loop = true;


const questions = [
  { question: "What is the main purpose of a narrative text?", answers: ["To describe a place", "To explain a process", "To tell a story or entertain", "To persuade the readers"], correct: 2 },
  { question: "Which of the following is the correct generic structure of a narrative text?", answers: ["Identification – Description – Conclusion", "Orientation – Complication – Resolution", "Thesis – Argument – Reiteration", "Introduction – Events – Closing"], correct: 1 },
  { question: "The princess lived in a big castle. The word 'lived' indicates that the story is told in:", answers: ["Simple present tense", "Present continuous tense", "Future tense", "Past tense"], correct: 3 },
  { question: "Once upon a time, there was a poor farmer who lived with his wife. One day, he found a golden goose in his barn.\n\nWhat is the complication in the story?", answers: ["The farmer found a goose", "The goose laid golden eggs", "The farmer became rich", "There is no clear problem in the story yet"], correct: 3 },
  { question: "Which sentence is an example of a resolution in a narrative text?", answers: ["The wolf chased the little girl.", "Finally, the prince and the princess lived happily ever after.", "Once upon a time, in a small village...", "The boy plays in the park every day."], correct: 1 },
  { question: "They were very happy and thanked the fairy. The word 'thanked' is:", answers: ["Present tense", "Past tense", "Past perfect", "Future tense"], correct: 1 },
  { question: "My father _ to work every day.", answers: ["go", "goes", "went", "going"], correct: 1 },
  { question: "She usually _ tea in the morning.", answers: ["drink", "drinks", "drank", "drinking"], correct: 1 },
  { question: "We _ to school at 6 a.m. every weekday.", answers: ["walk", "walks", "walked", "walking"], correct: 0 },
  { question: "Which sentence is in the simple present tense?", answers: ["I went to the library yesterday.", "She is studying now.", "He eats breakfast at 7 a.m.", "We will go to Bali."], correct: 2 },
  { question: "They _ not like spicy food.", answers: ["do", "does", "did", "doing"], correct: 0 },
  { question: "Yesterday, I _ my homework before dinner.", answers: ["do", "did", "does", "doing"], correct: 1 },
  { question: "We _ to the zoo last weekend.", answers: ["go", "goes", "went", "going"], correct: 2 },
  { question: "Choose the correct sentence in past tense:", answers: ["She cook dinner every night.", "She is cooking dinner now.", "She cooked dinner last night.", "She cooking dinner yesterday."], correct: 2 },
  { question: "What is the past form of 'buy'?", answers: ["Buys", "Buying", "Bought", "Buyed"], correct: 2 },
  { question: "Once upon a time, there lived a kind-hearted girl named Cinderella.\n\nThis sentence belongs to which part of the narrative text structure?", answers: ["Orientation", "Complication", "Resolution", "Evaluation"], correct: 0 },
  { question: "What is the main character called in the story of 'Snow White'?", answers: ["The witch", "The mirror", "Snow White", "The prince"], correct: 2 },
  { question: "A: 'What do you think about this movie?'\nB: '_'", answers: ["I think it’s amazing.", "I watch it every night.", "It was made in Hollywood.", "No, I don't."], correct: 0 },
  { question: "A: 'Can you help me with this homework?'\nB: '_'", answers: ["Sure, I’d be happy to.", "Yes, I can’t.", "I do my homework.", "No, thanks."], correct: 0 },
  { question: "Which expression is used to greet someone in the evening?", answers: ["Good morning", "Good night", "Good afternoon", "Good evening"], correct: 3 }
];

let currentQuestionIndex = 0;
let score = 0;
let lives = 5;

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");

  currentQuestionIndex = 0;
  score = 0;
  lives = 5;
  updateLives();
  showQuestion();

  if (backgroundMusic.paused) {
    backgroundMusic.play();
  }
}

function updateLives() {
  livesContainer.textContent = `❤️: ${lives}`;
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.classList.add("answer-button");
    btn.onclick = () => selectAnswer(index);
    answersContainer.appendChild(btn);
  });
}

function selectAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".answer-button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === currentQuestion.correct) {
      btn.classList.add("correct");
    } else if (i === index) {
      btn.classList.add("wrong");
    }
  });

  if (index === currentQuestion.correct) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
    lives -= 1;
    updateLives();
    if (lives <= 1) {
      setTimeout(showResult, 1500);
      return;
    }
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length && lives > 0) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultText.textContent = `Your score: ${score} / ${questions.length}`;
  backgroundMusic.pause();
}

startBtn.addEventListener("click", startQuiz);
retryBtn.addEventListener("click", startQuiz);
