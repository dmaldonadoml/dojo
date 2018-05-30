function FoundElements() {}

FoundElements.prototype.render = function(list) {
    return `Found ${list.count()} rooms`
};

module.exports = FoundElements;