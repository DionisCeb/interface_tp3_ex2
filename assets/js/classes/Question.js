// Définition de la classe Question
class Question {
    constructor(text, answers, nextButton, pointage) {
        // Initialisation des propriétés de la question
        this.text = text;
        this.answers = answers;
        this.nextButton = nextButton;
        this.pointage = pointage;
    }

    // Méthode pour afficher la question
    displayQuestion() {
         // sélection de l'élément HTML où afficher la question
        const questionElement = document.querySelector("#question");
        // affichage du texte de la question
        questionElement.innerHTML = this.text;
    }

    // Méthode pour afficher les réponses possibles
    displayAnswers() {
        //sélection des boutons de réponse
        const answerButtons = document.querySelector("#options");
         //suppression du contenu précédent des boutons de réponse
        answerButtons.innerHTML = "";

        //boucle sur toutes les réponses pour les afficher sous forme de boutons
        this.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            //ajout du texte de la réponse au bouton
            button.innerText = answer.text;
            //ajout d'une classe au bouton pour le style
            button.classList.add("btn");
            //pour indiquer si la réponse est correcte ou non
            button.dataset.isCorrect = answer.correct;

            // écouteur d'événements pour gérer le clic sur le bouton
            button.addEventListener("click", () => {
                this.selectAnswer(index);
            });

            //ajout du bouton à la liste des boutons de réponse
            answerButtons.appendChild(button);
        });
    }

    //méthode pour sélectionner une réponse
    selectAnswer(index) {
         //sélection du bouton de réponse choisi
        const selectedBtn = document.getElementById("options").children[index];
        //vérification si la réponse est correcte
        const isCorrect = selectedBtn.dataset.isCorrect === "true";
        //traitement en fonction de la réponse sélectionnée
        if (isCorrect) {
            //ajout d'une classe pour indiquer que la réponse est correcte
            selectedBtn.classList.add("correct");
            //incrémentation du score
            this.pointage.incrementScore();
        } else {
            //ajout d'une classe pour indiquer que la réponse est incorrecte
            selectedBtn.classList.add("incorrect");
        }

        // Désactivation de tous les boutons de réponse après avoir choisi une réponse!
        Array.from(document.getElementById("options").children).forEach(button => {
            if(button.dataset.isCorrect === "true") {
                button.classList.add("correct");
            }
            //désactivation du bouton
            button.disabled = true;
        });

        //affichage du bouton "Suivant"
        this.nextButton.style.display = "block";
    }

    //méthode pour vérifier si une réponse est correcte
    isCorrect(index) {
        return this.answers[index].correct;
    }
}

export default Question;