function Room(label, capacity, area, computers) {
    this.label = label;
    this.capacity = capacity;
    this.area = area;
    this.computers = computers || 0;
}
Room.prototype.fitsCapacity = function(capacity) {
    return this.capacity >= capacity;
};
Room.prototype.fitsArea = function(area) {
    return this.area >= area;
};
Room.prototype.fitsComputers = function(computers) {
    return this.computers >= computers;
};
Room.prototype.getLabelAsText = function() {
    return this.label.asText();
};
Room.prototype.getLabelAsBraille = function() {
    return this.label.asBraille();
};

module.exports = Room;