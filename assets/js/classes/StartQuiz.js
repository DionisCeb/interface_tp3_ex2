
class StartQuiz {
    constructor(quizzSection, startQuizSection, startQuizButton) {
        //la section du quiz
        this.quizzSection = quizzSection;
        //la section bienvenue
        this.startQuizSection = startQuizSection;
        //le bouton Commencer le quiz
        this.startQuizButton = startQuizButton;
    }

    // Méthode pour afficher la page d'accueil du quiz
    showLandingPage(){

        // Écouteur d'événements pour startquiz_btn
        this.startQuizButton.addEventListener("click", () => {
            //appel de la méthode pour afficher le quiz
            this.showQuiz();
        });
    }

    // Méthode pour afficher le quiz
    showQuiz() {
        //Masquage de la section de démarrage du quiz
        this.startQuizSection.classList.add("hide");
        //Affichage de la section du quiz
        this.quizzSection.classList.remove("hide");
    }
}

export default StartQuiz;
