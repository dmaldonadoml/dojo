const Oro = require('./Palo/Oro');

class SieteOro {
    constructor() {
        this.palo = new Oro()
    }
    getEnvidoValue() {
        return 7
    }
    getPalo() {
        return this.palo
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
}
module.exports = SieteOro;