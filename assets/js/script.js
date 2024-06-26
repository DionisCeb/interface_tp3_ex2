import questions from "./donnees/questions.js";
import Question from "./classes/Question.js";
import ScoreTracker from "./classes/Pointage.js";

let scoreTracker = new ScoreTracker();
let currentQuestion;
let currentQuestionIndex = 0;
let score = 0;

const nextButton = document.querySelector("#suivant-btn");
const answerButtons = document.querySelector("#options");
const questionElement = document.querySelector("#question");

function startQuiz() {
    score = 0; 
    nextButton.innerHTML = "Suivant";
    nextButton.removeEventListener("click", startQuiz);

    if(currentQuestionIndex >= questions.length) {
        showScore();
        currentQuestionIndex = 0;
        nextButton.removeEventListener("click", showScore);
    } else {
        showQuestion();
    }
} 

function showQuestion() {
    resetState();

    currentQuestion = new Question(questions[currentQuestionIndex].question, questions[currentQuestionIndex].answers, nextButton, scoreTracker);
    currentQuestion.displayQuestion();
    currentQuestion.displayAnswers(currentQuestion.selectAnswer);
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(index) {
    currentQuestion.selectAnswer(index);
}


function showScore() {
    scoreTracker.displayScore(questionElement, questions.length);
    resetState();
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
    
    nextButton.addEventListener("click", startQuiz);  
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", handleNextButton);

startQuiz();
