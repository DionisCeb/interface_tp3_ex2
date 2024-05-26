import questions from "./donnees/questions.js";
import Question from "./classes/Question.js";
import Pointage from "./classes/Pointage.js";
import StartQuiz from "./classes/StartQuiz.js";

// Déclaration des variables globales
let pointage = undefined;
let currentQuestion = undefined;
let currentQuestionIndex = 0;

// Sélection des éléments du HTML
const nextButton = document.querySelector("#suivant-btn");
const answerButtons = document.querySelector("#options");
const questionElement = document.querySelector("#question");


// Initialiser les variable pour le changement des sections
const startQuizButton = document.querySelector("#startquiz_btn");
const startQuizSection = document.querySelector("#startquiz_section");
const quizzSection = document.querySelector("#quizz_section");



// Fonction pour afficher le quiz
function showQuiz() {
    // Masquage de la section de démarrage du quiz
    quizzSection.classList.add("hide");
    // Création d'une nouvelle instance de la classe StartQuiz
    let quiz =  new StartQuiz(quizzSection, startQuizSection, startQuizButton);
    // Affichage de la page de démarrage du quiz
    quiz.showLandingPage();
    // Démarrage du quiz
    startQuiz();
}

// Fonction pour démarrer le quiz
function startQuiz() {
    // Initialisation du score
    pointage = new Pointage();

    // affichage du score current
    getCurrentScore();
    // réinitialisation de l'index de la question courante
    currentQuestionIndex = 0;
    // changement du texte du bouton "Suivant
    nextButton.innerHTML = "Suivant";
    // l'écouteur d'événements pour le bouton dont change les questions
    nextButton.removeEventListener("click", startQuiz);

    // Vérification s'il y a encore des questions à afficher
    if(currentQuestionIndex >= questions.length) {
        //affichage du score final
        showScore();
        nextButton.removeEventListener("click", showScore);
    } else {
        //affichage de la première question
        showQuestion();
    }
} 

function showQuestion() {
    //réinitialisation de l'état
    resetState();

    //! Création d'une nouvelle instance de la classe Question
    currentQuestion = new Question(
        questions[currentQuestionIndex].question, 
        questions[currentQuestionIndex].answers, 
        nextButton, 
        pointage
    );
    // Affichage de la question
    currentQuestion.displayQuestion();
    // Affichage des options de réponse
    currentQuestion.displayAnswers(currentQuestion.selectAnswer);
}

function resetState() {
    nextButton.classList.add("hide");
    
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {

    getCurrentScore();
    // Affichage du score final dans l'élément HTML de la question
    questionElement.innerHTML = `Vous avez gagné ${pointage.getScore()} sur ${questions.length}!`;

    //réinitialisation de l'état
    resetState();

    //!Changement du texte du bouton "Suivant"
    nextButton.innerHTML = "Jouer encore";
    nextButton.classList.add("show");
    
     //Ajout d'un écouteur d'événements pour redémarrer le quiz lorsque le bouton "Suivant" est cliqué
    nextButton.addEventListener("click", startQuiz);  
}


//Fonction pour gérer le clic sur le bouton "Suivant"
function handleNextButton() {
    //passer à la question suivante
    currentQuestionIndex++;
    //vérifier s'il reste des questions à afficher
    if(currentQuestionIndex < questions.length) {
        //Affichage de la question suivante
        showQuestion();
    } else {
        //Affichage du score final
        showScore();
    }
}

function getCurrentScore() {
    let currentScore = pointage.getScore();
}

// Ajout d'un écouteur d'événements pour le clic sur le bouton "Suivant"
nextButton.addEventListener("click", handleNextButton);

    
showQuiz();

