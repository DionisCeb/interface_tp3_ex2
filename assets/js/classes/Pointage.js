class Pointage {
    // Propriété privée pour stocker le score!
    #score;
    // Constructeur de la classe Pointage
    constructor() {
        //initialisation du score à zéro
        this.#score = 0;
    }

    incrementScore() {
        //incrémentation du score de 1
        this.#score++;
    }

    resetScore() {
        //réinitialisation du score à zéro
        this.#score = 0;
    }

    getScore() {
        //retourne le score actuel
        return this.#score;
    }
}



export default Pointage; 