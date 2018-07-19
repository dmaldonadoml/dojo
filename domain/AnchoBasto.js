class Basto {}

class AnchoBasto {
    compite(otraCarta) {
        return otraCarta.compiteAnchoBasto(this)
    }
    equals(otraCarta) {
        return otraCarta instanceof AnchoBasto
    }
    constructor() {
        this.palo = new Basto()
    }
    getEnvidoValue() {
        return 0
    }
    getPalo() {
        return this.palo
    }
    samePaloAs(card) {
        return this.palo.equals(card.getPalo())
    }
}

module.exports = AnchoBasto