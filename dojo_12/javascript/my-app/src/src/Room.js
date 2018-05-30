function Room(name, capacity, area, computers) {
    this.name = name;
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
Room.prototype.getName = function() {
    return this.name;
};

module.exports = Room;