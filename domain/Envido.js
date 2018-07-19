const EnvidoValue = require('./EnvidoValue');
const ENVIDO_PLUS = 20;

class Envido {
    play(mano) {
        return mano.getSamePalo((cards) => {

            if (cards.length === 1) {
                return new EnvidoValue(mano.getGreatestCard())
            }

            const value = cards
            .map(card => card.getEnvidoValue())
            .reduce((a, b) => {
                return a + b
            });
            return new EnvidoValue(value + ENVIDO_PLUS);
        });
    }
}
module.exports = Envido;