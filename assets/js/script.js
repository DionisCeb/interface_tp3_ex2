import questions from "./donnees/questions.js";
import Question from "./classes/Question.js";

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#options");
const nextButton = document.querySelector("#suivant-btn");

let currentQuestion;
let currentQuestionIndex = 0;
let score = 0;

console.log(questions);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    showQuestion();
}

function showQuestion() {
    resetState();
    currentQuestion = new Question(questions[currentQuestionIndex].question, questions[currentQuestionIndex].answers);
    questionElement.innerHTML = currentQuestion.text;
    answerButtons.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        // Pass the isCorrect flag as a data attribute
        button.dataset.isCorrect = answer.correct;
        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.block = "none"
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// Function to handle user selection of an answer
function selectAnswer(index) {
    const selectedBtn = answerButtons.children[index];
    const isCorrect = selectedBtn.dataset.isCorrect === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disable all answer buttons after clicking
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.isCorrect === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Function to show the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz); // Call startQuiz when "Play again" is clicked
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        //Montre la prochaine question s'il y'a
        showQuestion();
        console.log(`showQuestion: ${currentQuestionIndex}`);
    } else {
        //Si y a pas d'autres questions montre le pointage
        showScore();
    }
}


nextButton.addEventListener("click", handleNextButton);





startQuiz();