class Espada {}

class SieteEspada {
    compiteAnchoBasto(anchoBasto) {
        return anchoBasto
    }
    constructor() {
        this.palo = new Espada()
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

module.exports = SieteEspada