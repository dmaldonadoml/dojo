function CustomFoundElements() {}

CustomFoundElements.prototype.renderRoomList = function(list) {
    return `Found ${list.count()} rooms`
};
CustomFoundElements.prototype.renderEmptyRoomList = function(list) {
    return `Sorry, no rooms for your needs`
};
CustomFoundElements.prototype.render = function(list) {
    return list.renderIn(this);
};

module.exports = CustomFoundElements;