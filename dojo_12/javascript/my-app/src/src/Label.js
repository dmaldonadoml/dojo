const braille = require('braille');

function Label(label) {
    this.label = label;
}

Label.prototype.asBraille = function() {
    return braille.toBraille(this.label);
};

Label.prototype.asText = function() {
    return this.label;
};

module.exports = Label;