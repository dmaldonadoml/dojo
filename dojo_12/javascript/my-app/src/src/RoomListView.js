function RoomsListView(list) {
    this.list = list;
}
RoomsListView.prototype.pickFirst = function() {
    return this.list.pickFirst();
};
RoomsListView.prototype.search = function(req) {
    return new RoomsListView(this.list.filter(req));
};
RoomsListView.prototype.render = function() {
    return this.list.renderIn(this);
};
RoomsListView.prototype.renderFoundResults = function(count) {
    return `Found ${count} rooms`;
};
RoomsListView.prototype.renderNonFoundResults = function() {
    return `No rooms for you`;
};
RoomsListView.prototype.iterate = function(cb) {
    return this.list.iterate(cb);
};

module.exports = RoomsListView;