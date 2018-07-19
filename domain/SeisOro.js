const Oro = require('../domain/Palo/Oro');

class SeisOro {
    constructor() {
        this.palo = new Oro()
    }
    getEnvidoValue() {
        return 6
    }
    getPalo() {
        return this.palo
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
}

module.exports = SeisOro;