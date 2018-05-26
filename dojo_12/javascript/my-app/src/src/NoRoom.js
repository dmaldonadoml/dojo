function NoRoom() {}

NoRoom.prototype.fitsCapacity = function(req) {
    return true;
};
NoRoom.prototype.fitsArea = function(req) {
    return true;
};
NoRoom.prototype.fitsComputers = function(req) {
    return true;
};
NoRoom.prototype.getLabelAsText = function() {
    return 'No room';
};

module.exports = NoRoom;