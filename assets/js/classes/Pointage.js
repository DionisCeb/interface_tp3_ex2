class ScoreTracker {
    constructor() {
        this.score = 0;
    }

    incrementScore() {
        this.score++;
        console.log("Score incremented Pointage:", this.score);
    }

    resetScore() {
        this.score = 0;
    }

    /*Afficher les points*/
    displayScore(scoreElement, totalQuestions) {
        console.log(`Score = ${this.score}`);
        scoreElement.innerHTML = `You scored ${this.score} out of ${totalQuestions}!`;
    }
}

export default ScoreTracker; 