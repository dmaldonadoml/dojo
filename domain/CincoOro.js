const Oro = require('../domain/Palo/Oro');

class CincoOro {
    constructor() {
        this.palo = new Oro()
    }
    getEnvidoValue() {
        return 5
    }
    getPalo() {
        return this.palo
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
}

module.exports = CincoOro;