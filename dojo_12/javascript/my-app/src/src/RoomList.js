function RoomsList(rooms) {
    this.rooms = rooms;
}
RoomsList.prototype.pickFirst = function() {
    return this.rooms[0];
};
RoomsList.prototype.pickSecond = function() {
    return this.rooms[1];
};
RoomsList.prototype.filter = function(req) {
    const rooms = this.rooms.filter(room => req.fits(room));
    if (new RoomsList(rooms).isEmpty()) {
        return new EmptyRoomsList();
    }
    return new RoomsList(rooms);
};
RoomsList.prototype.isEmpty = function() {
    return this.rooms.length === 0;
};
RoomsList.prototype.count = function() {
    return this.rooms.length;
};
RoomsList.prototype.renderIn = function(view) {
    return view.renderFoundResults(this.rooms.length);
};
RoomsList.prototype.iterate = function(cb) {
    return this.rooms.map(cb);
};

function EmptyRoomsList() {}
EmptyRoomsList.prototype.renderIn = function(view) {
    return view.renderNonFoundResults();
};
EmptyRoomsList.prototype.iterate = function(cb) {
};
EmptyRoomsList.prototype.filter = function(cb) {
    return this;
};

module.exports = RoomsList;