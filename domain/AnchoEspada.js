class Espada {}

class AnchoEspada {
    constructor() {
        this.palo = new Espada()
    }
    compite(otraCarta) {
        return this
    }
    compiteAnchoBasto(otraCarta) {
        return this
    }
    equals(otraCarta) {
        return otraCarta instanceof AnchoEspada
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
    getPalo() {
        return this.palo
    }
    getEnvidoValue() {
        return 0
    }
}

module.exports = AnchoEspada