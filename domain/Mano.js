class Mano {
    constructor(a, b, c) {
        this.cards = [a, b, c];
    }
    play(envido) {
        return envido.play(this);
    }
    getGreatestCard() {
        return Math.max.apply(Math, this.cards.map(card => card.getEnvidoValue()));
    }
    getSamePalo(cb) {
        const first = this.cards.concat([]).shift();
        return cb(this.cards.filter(card => first.samePaloAs(card)));
    }
}

module.exports = Mano;