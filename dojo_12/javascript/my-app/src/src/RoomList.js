const EmptyRoomsList = require('./EmptyRoomList');

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
    return view.renderRoomList(this);
};
RoomsList.prototype.iterate = function(cb) {
    return this.rooms.map(cb);
};

module.exports = RoomsList;