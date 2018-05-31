//this dependency doesnt need to be here
const braille = require('braille');

function Label(label) {
    this.label = label;
}

Label.prototype.toBraille = function() {
    return braille.toBraille(this.label);
};

Label.prototype.toText = function() {
    return this.label;
};

module.exports = Label;