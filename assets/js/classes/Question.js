class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    //La methode pour afficher le text de la question
    displayQuestion() {
        console.log(this.text);
    }

    //La metode pour afficher les options de reponse
    displayAnswers() {
        this.answers.forEach((answer, index) => {
            console.log((`${index + 1}. ${answer.text}`));
        });
    }

    //La methode pour verifie si la reponse
    isCorrect(index) {
        
        return this.answers[index].correct;
    } 
}

export default Question;