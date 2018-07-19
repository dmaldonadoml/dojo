const Oro = require('../domain/Palo/Oro');

class TresOro {
    constructor() {
        this.palo = new Oro()
    }
    getEnvidoValue() {
        return 3
    }
    getPalo() {
        return this.palo
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
}

module.exports = TresOro;