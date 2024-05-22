import ScoreTracker from "./Pointage.js";

class Question {
    constructor(text, answers, nextButton) {
        this.text = text;
        this.answers = answers;
        this.nextButton = nextButton;
        this.scoreTracker = new ScoreTracker();
    }

    displayQuestion() {
        const questionElement = document.querySelector("#question");
        questionElement.innerHTML = this.text;
    }

    displayAnswers() {
        const answerButtons = document.querySelector("#options");
        answerButtons.innerHTML = "";

        this.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            button.dataset.isCorrect = answer.correct;

            button.addEventListener("click", () => {
                this.selectAnswer(index);
            });

            answerButtons.appendChild(button);
        });
    }

    selectAnswer(index) {
        const selectedBtn = document.getElementById("options").children[index];
        const isCorrect = selectedBtn.dataset.isCorrect === "true";
        if (isCorrect) {
            
            selectedBtn.classList.add("correct");
            this.scoreTracker.incrementScore();
            console.log("Score after increment Question:", this.scoreTracker.score);
        } else {
            selectedBtn.classList.add("incorrect");
        }

        Array.from(document.getElementById("options").children).forEach(button => {
            if(button.dataset.isCorrect === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        this.nextButton.style.display = "block"; // Access nextButton from the instance
    }

    isCorrect(index) {
        return this.answers[index].correct;
    }
}

export default Question;
