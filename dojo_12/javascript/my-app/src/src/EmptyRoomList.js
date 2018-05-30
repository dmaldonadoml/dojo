function EmptyRoomsList() {}
EmptyRoomsList.prototype.renderIn = function(view) {
    return view.renderEmptyRoomList();
};
EmptyRoomsList.prototype.iterate = function(cb) {
};
EmptyRoomsList.prototype.filter = function(cb) {
    return this;
};
EmptyRoomsList.prototype.count = function() {
    return 0;
};
module.exports = EmptyRoomsList;